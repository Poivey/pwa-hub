import { DynamoDB } from 'aws-sdk'
import { v4 as uuid } from 'uuid'
import { Pwa } from '../../entities/model/pwa'
import { PwaSearchResults } from '../resultModels/pwaSearchResults'
import { getClient, marshal, marshalString, unmarshal, unmarshalList } from '../util'
import { table } from './table'

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
  ProjectionExpression?: string
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
  startKey?: string
): Promise<PwaSearchResults> => {
  if (!startKey) {
    return iterativeScan(input, minResults)
  } else {
    let dynamoKey: DynamoDB.Key | undefined
    try {
      dynamoKey = JSON.parse(startKey)
    } catch {}
    return iterativeScan(input, minResults, dynamoKey)
  }
}

export const searchInCategory = async (
  input: string,
  category: string,
  minResults: number,
  startKey?: string
): Promise<PwaSearchResults> => {
  if (!startKey) {
    return iterativeCategoryQuery(input, category, minResults)
  } else {
    let dynamoKey: DynamoDB.Key | undefined
    try {
      dynamoKey = JSON.parse(startKey)
    } catch {}
    return iterativeCategoryQuery(input, category, minResults, dynamoKey)
  }
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
