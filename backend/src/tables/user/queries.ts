import { v4 as uuid } from 'uuid'
import { User } from '../../entities/model/user'
import { getClient, marshal, marshalString, unmarshal } from '../util'
import { table } from './table'
import { NewUser } from '../../entities/requests/newUser'

export const getById = async (id: string): Promise<User | undefined> => {
  const result: any = await getClient()
    .get({
      TableName: table.name.get(),
      Key: { id },
    })
    .promise()
  return unmarshal(result.Item)
}

export const getNameById = async (id: string): Promise<string> => {
  const result = await getClient()
    .get({
      TableName: table.name.get(),
      Key: { id },
      ProjectionExpression: '#username',
      ExpressionAttributeNames: {
        '#username': 'username',
      },
    })
    .promise()
  return result.Item && result.Item['username']
}

export const getByDevToken = async (devToken: string): Promise<User | undefined> => {
  if (!devToken) {
    return
  }
  const result: any = await getClient()
    .query({
      TableName: table.name.get(),
      IndexName: 'devTokenIndex',
      Limit: 1,
      KeyConditionExpression: '#devToken = :v_devToken',
      ExpressionAttributeNames: { '#devToken': 'devToken' },
      ExpressionAttributeValues: { ':v_devToken': devToken },
    })
    .promise()
  return result.Items && result.Items.length > 0 && unmarshal(result.Items[0])
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

export const existByEmail = async (email: string): Promise<string | undefined> => {
  const result = await getClient()
    .query({
      TableName: table.name.get(),
      IndexName: 'emailKeysOnly',
      Limit: 1,
      KeyConditionExpression: '#email = :v_email',
      ExpressionAttributeNames: { '#email': 'email' },
      ExpressionAttributeValues: { ':v_email': email },
    })
    .promise()
  return result.Items && result.Items.length > 0 && unmarshal(result.Items[0]).id
}

export const create = async (user: User): Promise<User> => {
  user.id = uuid()
  user.accountCreationDate = new Date().toISOString()
  await getClient()
    .put({
      TableName: table.name.get(),
      Item: marshal(user),
    })
    .promise()
  return unmarshal(user)
}

export const partialUpdate = async (
  userUpdatedFields: NewUser,
  userId: string,
  currentEmail: string
): Promise<User> => {
  const result: any = await getClient()
    .update({
      TableName: table.name.get(),
      Key: { id: userId },
      ReturnValues: 'ALL_NEW',
      ConditionExpression: 'attribute_exists(#id) AND #email = :v_current_email',
      UpdateExpression: 'SET #email = :v_email, #username = :v_username',
      ExpressionAttributeNames: {
        '#id': 'id',
        '#email': 'email',
        '#username': 'username',
      },
      ExpressionAttributeValues: {
        ':v_current_email': marshalString(currentEmail.toLowerCase()),
        ':v_email': marshalString(userUpdatedFields.email.toLowerCase()),
        ':v_username': marshalString(userUpdatedFields.username),
      },
    })
    .promise()
  return unmarshal(result.Attributes)
}

export const destroy = async (id: string): Promise<boolean> => {
  const result = await getClient()
    .delete({
      TableName: table.name.get(),
      Key: { id },
      ReturnValues: 'ALL_OLD',
    })
    .promise()
  return !!result.Attributes
}

export const updateDevToken = async (userId: string, devToken: string): Promise<User> => {
  const result: any = await getClient()
    .update({
      TableName: table.name.get(),
      Key: { id: userId },
      ReturnValues: 'ALL_NEW',
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
        ':v_devTokenLastUpdatedDate': new Date().toISOString(),
      },
    })
    .promise()
  return unmarshal(result.Attributes)
}
