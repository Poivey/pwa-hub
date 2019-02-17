import { Table } from '@pulumi/aws/dynamodb/'
import { User } from '../entities/model/user'
import { v4 as uuid } from 'uuid'
import { DynamoDB } from 'aws-sdk'
import { marshal, unmarshal, marshalString } from './util'

const table = new Table('user', {
  attributes: [{ name: 'id', type: 'S' }, { name: 'email', type: 'S' }],
  hashKey: 'id',
  writeCapacity: 1,
  readCapacity: 1,
  globalSecondaryIndexes: [
    {
      hashKey: 'email',
      name: 'emailKeysOnly',
      // est-ce qu'il ne vaut mieux pas faire avec ALL si de toutes façons
      // on a déjà la table, et faire une projection sur la query du exist
      // directement pour réduire la taille des données traitées ?
      projectionType: 'KEYS_ONLY',
      readCapacity: 1,
      writeCapacity: 1,
    },
  ],
  billingMode: 'PROVISIONED',
})

const getClient = (): DynamoDB.DocumentClient => new DynamoDB.DocumentClient()

export const getById = async (id: string): Promise<User | null> => {
  const result: any = await getClient()
    .get({
      TableName: table.name.get(),
      Key: { id },
    })
    .promise()
  return unmarshal(result.Item)
}

export const existById = async (id: string): Promise<boolean> => {
  const result = await getClient()
    .query({
      TableName: table.name.get(),
      Select: 'COUNT',
      KeyConditionExpression: '#id = :v_id',
      ExpressionAttributeNames: { '#id': 'id' },
      ExpressionAttributeValues: { ':v_id': id },
    })
    .promise()
  return result.Count != 0
}

export const existByEmail = async (email: string): Promise<boolean> => {
  const result = await getClient()
    .query({
      TableName: table.name.get(),
      IndexName: 'emailKeysOnly',
      Select: 'COUNT',
      KeyConditionExpression: '#email = :v_email',
      ExpressionAttributeNames: { '#email': 'email' },
      ExpressionAttributeValues: { ':v_email': email },
    })
    .promise()
  console.log('exist by email result with no limit parameter')
  console.log(result)
  return result.Count != 0
}

export const create = async (user: User): Promise<User> => {
  user.id = uuid()
  user.accountCreationDate = new Date().toUTCString()
  await getClient()
    .put({
      TableName: table.name.get(),
      Item: marshal(user),
    })
    .promise()
  return user
}

export const destroy = async (id: string): Promise<boolean> => {
  await getClient()
    .delete({
      TableName: table.name.get(),
      Key: { id },
    })
    .promise()
  return true // TODO with the res of delete call, return true or false
}

export const updateDevToken = async (userId: string, devToken: string): Promise<void> => {
  await getClient()
    .update({
      TableName: table.name.get(),
      Key: { id: userId },
      ConditionExpression: 'attribute_exists(#id)',
      UpdateExpression:
        'SET #devToken = :v_devToken, #devTokenLastUpdatedDate = :v_devTokenLastUpdatedDate',
      ExpressionAttributeNames: {
        '#id': 'id',
        '#devToken': 'devToken',
        '#devTokenLastUpdatedDate': 'devTokenLastUpdatedDate',
      },
      ExpressionAttributeValues: {
        ':v_devToken': marshalString(devToken),
        ':v_devTokenLastUpdatedDate': new Date().toUTCString(),
      },
    })
    .promise()
}
