import { Table } from '@pulumi/aws/dynamodb/'
import { Pwa } from '../entities/model/pwa'
import { v4 as uuid } from 'uuid'
import { DynamoDB } from 'aws-sdk'
import { PwaSearchResults } from './model/pwaSearchResults'
import { marshal, unmarshal, marshalString, unmarshalList } from './util'
import { User } from '../entities/model/user'
import * as userTable from './userTable'

const table = new Table('pwa', {
  attributes: [
    { name: 'id', type: 'S' },
    { name: 'url', type: 'S' },
    { name: 'category', type: 'S' },
    { name: 'creatorId', type: 'S' },
    { name: 'popularity', type: 'N' },
  ],
  hashKey: 'id',
  writeCapacity: 1,
  readCapacity: 1,
  globalSecondaryIndexes: [
    {
      hashKey: 'url',
      name: 'urlKeysOnly',
      // Il vaut mieux faire avec ALL/INCLUDE si quelque part on a besoin de toutes les infos
      // et projection sur la query pour réduire la taille des données en lecture
      projectionType: 'KEYS_ONLY',
      readCapacity: 1,
      writeCapacity: 1,
    },
    {
      hashKey: 'category',
      name: 'search',
      projectionType: 'INCLUDE',
      rangeKey: 'popularity', // TODO sorting on new pwa attribute "popularity, hidden from DAO, combinaison of comments and rate !"
      nonKeyAttributes: ['id', 'name', 'iconUrl', 'creatorId', 'creatorUsername', 'reviewCount'],
      readCapacity: 1,
      writeCapacity: 1,
    },
    {
      hashKey: 'creatorId',
      name: 'creatorId',
      projectionType: 'INCLUDE',
      rangeKey: 'popularity',
      nonKeyAttributes: ['id', 'name', 'iconUrl', 'devToken', 'reviewCount'],
      readCapacity: 1,
      writeCapacity: 1,
    },
  ],
  billingMode: 'PROVISIONED',
})

const getClient = (): DynamoDB.DocumentClient => new DynamoDB.DocumentClient()

export const getById = async (id: string): Promise<Pwa | null> => {
  const result: any = await getClient()
    .get({
      TableName: table.name.get(),
      Key: { id },
    })
    .promise()
  return unmarshal(result.Item)
}

export const getByCreatorId = async (
  creatorId: string,
  ProjectionExpression: string
): Promise<Pwa[] | null> => {
  const result = await getClient()
    .query({
      TableName: table.name.get(),
      IndexName: 'creatorId',
      KeyConditionExpression: '#creatorId = :v_creatorId',
      ExpressionAttributeNames: { '#creatorId': 'creatorId' },
      ExpressionAttributeValues: { ':v_creatorId': creatorId },
      ProjectionExpression: ProjectionExpression,
    })
    .promise()
  if (result.Items) {
    return unmarshalList(result.Items)
  } else {
    return null
  }
}

export const existByUrl = async (url: string): Promise<boolean> => {
  const result = await getClient()
    .query({
      TableName: table.name.get(),
      IndexName: 'urlKeysOnly',
      Limit: 1,
      KeyConditionExpression: '#url = :v_url',
      ExpressionAttributeNames: { '#url': 'url' },
      ExpressionAttributeValues: { ':v_url': url },
    })
    .promise()
  return result.Count != 0
}

export const create = async (pwa: Pwa): Promise<Pwa> => {
  pwa.id = uuid()
  pwa.createdDate = new Date().toUTCString()
  pwa.lastUpdatedDate = pwa.createdDate
  pwa.screenshots = []
  await getClient()
    .put({
      TableName: table.name.get(),
      Item: marshal(pwa),
    })
    .promise()
  return pwa
}

export const addScreenshot = async (
  screenshotKey: string,
  pwaId: string,
  devToken: string
): Promise<void> => {
  await getClient()
    .update({
      TableName: table.name.get(),
      Key: { id: pwaId },
      ConditionExpression:
        'attribute_exists(#id) AND #devToken <> :v_empty AND #devToken = :v_devToken AND size(#screenshots) < :v_maxScreenshots',
      UpdateExpression: 'SET #screenshots = list_append(#screenshots, :v_screenshot)',
      ExpressionAttributeNames: {
        '#id': 'id',
        '#devToken': 'devToken',
        '#screenshots': 'screenshots',
      },
      ExpressionAttributeValues: {
        ':v_devToken': marshalString(devToken),
        ':v_empty': marshalString(''),
        ':v_screenshot': [screenshotKey],
        ':v_maxScreenshots': 10,
      },
    })
    .promise()
}

export const searchInAll = async (
  input: string,
  minResults: number,
  startKey?: DynamoDB.Key
): Promise<PwaSearchResults> => {
  return iterativeScan(input, minResults, startKey)
}

export const searchInCategory = async (
  input: string,
  category: string,
  minResults: number,
  startKey?: DynamoDB.Key
): Promise<PwaSearchResults> => {
  return iterativeCategoryQuery(input, category, minResults, startKey)
}

const iterativeScan = async (
  input: string,
  minResults: number,
  startKey?: DynamoDB.Key
): Promise<PwaSearchResults> => {
  const results: any[] = []
  const dynamoClient = getClient()
  let lastEvaluatedKey = startKey
  do {
    const batch = await dynamoClient
      .scan({
        TableName: table.name.get(),
        IndexName: 'search',
        ExclusiveStartKey: lastEvaluatedKey,
        Limit: input ? 10 * minResults : minResults,
        FilterExpression: input ? 'contains(#name, :v_input)' : undefined,
        ExpressionAttributeNames: input ? { '#name': 'name' } : undefined,
        ExpressionAttributeValues: input ? { ':v_input': input } : undefined,
      })
      .promise()
    if (batch.Items) {
      results.push(...batch.Items.map(record => unmarshal(record)))
    }
    lastEvaluatedKey = batch.LastEvaluatedKey
  } while (!!lastEvaluatedKey && results.length < minResults)
  return { results, lastEvaluatedKey }
}

const iterativeCategoryQuery = async (
  input: string,
  category: string,
  minResults: number,
  startKey?: DynamoDB.Key
): Promise<PwaSearchResults> => {
  const results: any[] = []
  const dynamoClient = getClient()
  let lastEvaluatedKey = startKey
  do {
    const batch = await dynamoClient
      .query({
        TableName: table.name.get(),
        IndexName: 'search',
        ExclusiveStartKey: lastEvaluatedKey,
        Limit: input ? 10 * minResults : minResults,
        KeyConditionExpression: '#category = :v_category',
        FilterExpression: input ? 'contains(#name, :v_input)' : undefined,
        ExpressionAttributeNames: input
          ? { '#category': 'category', '#name': 'name' }
          : { '#category': 'category' },
        ExpressionAttributeValues: input
          ? { ':v_category': category, ':v_input': input }
          : { ':v_category': category },
      })
      .promise()
    if (batch.Items) {
      results.push(...batch.Items.map(record => unmarshal(record)))
    }
    lastEvaluatedKey = batch.LastEvaluatedKey
  } while (!!lastEvaluatedKey && results.length < minResults)
  return { results, lastEvaluatedKey }
}

export const updateCreatorInfo = async (creatorId: string): Promise<void> => {
  const dynamoClient = getClient()
  const pwaFromUser = await getByCreatorId(creatorId, 'id')
  if (pwaFromUser) {
    const user: User | null = await userTable.getById(creatorId)
    if (user) {
      for (const pwa of pwaFromUser) {
        await dynamoClient
          .update({
            TableName: table.name.get(),
            Key: { id: pwa.id },
            ConditionExpression: 'attribute_exists(#id)',
            UpdateExpression: 'SET #devToken = :v_devToken, #creatorUsername = :v_creatorUsername',
            ExpressionAttributeNames: {
              '#id': 'id',
              '#devToken': 'devToken',
              '#creatorUsername': 'creatorUsername',
            },
            ExpressionAttributeValues: {
              ':v_devToken': marshalString(user.devToken),
              ':v_creatorUsername': marshalString(user.username),
            },
          })
          .promise()
      }
    }
  }
}
