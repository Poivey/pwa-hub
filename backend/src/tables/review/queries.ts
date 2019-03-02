import { Review, MAX_RATE, MIN_RATE } from '../../entities/model/review'
import * as pwaTable from '../pwa/queries'
import * as userTable from '../user/queries'
import { getClient, marshal, unmarshal, unmarshalList, marshalString } from '../util'
import { table } from './table'
import { ReviewResults } from '../resultModels/reviewResults'
import { DynamoDB } from 'aws-sdk'

export const getById = async (pwaId: string, userId: string): Promise<Review | null> => {
  const result: any = await getClient()
    .get({
      TableName: table.name.get(),
      Key: { pwaId, userId },
    })
    .promise()
  return unmarshal(result.Item)
}

export const existById = async (pwaId: string, userId: string): Promise<boolean> => {
  const result = await getClient()
    .query({
      TableName: table.name.get(),
      Select: 'COUNT',
      KeyConditionExpression: '#pwaId = :v_pwaId AND #userId = :v_userId',
      ExpressionAttributeNames: { '#pwaId': 'pwaId', '#userId': 'userId' },
      ExpressionAttributeValues: { ':v_pwaId': pwaId, ':v_userId': userId },
    })
    .promise()
  return result.Count != 0
}

export const create = async (review: Review): Promise<Review> => {
  review.creationDate = new Date().toISOString()
  review.pwaName = await pwaTable.getNameById(review.pwaId)
  review.username = await userTable.getNameById(review.userId)
  review.rate = parseRate(review.rate)
  await getClient()
    .put({
      TableName: table.name.get(),
      Item: marshal(review),
    })
    .promise()
  return unmarshal(review)
}

export const parseRate = (rate: number): number => {
  if (rate > MAX_RATE) return MAX_RATE
  if (rate < MIN_RATE) return MIN_RATE
  return parseInt(rate.toString())
}

export const update = async (
  pwaId: string,
  userId: string,
  rate: number,
  content: string
): Promise<Review> => {
  const result: any = await getClient()
    .update({
      TableName: table.name.get(),
      Key: { pwaId, userId },
      ReturnValues: 'ALL_OLD',
      ConditionExpression: 'attribute_exists(#pwaId) AND attribute_exists(#userId)',
      UpdateExpression:
        'SET #rate = :v_rate, #content = :v_content, #creationDate = :v_creationDate',
      ExpressionAttributeNames: {
        '#pwaId': 'pwaId',
        '#userId': 'userId',
        '#rate': 'rate',
        '#content': 'content',
        '#creationDate': 'creationDate',
      },
      ExpressionAttributeValues: {
        ':v_rate': rate,
        ':v_content': marshalString(content),
        ':v_creationDate': new Date().toISOString(),
      },
    })
    .promise()
  return unmarshal(result.Attributes)
}

export const destroy = async (pwaId: string, userId: string): Promise<Review> => {
  const result: any = await getClient()
    .delete({
      TableName: table.name.get(),
      Key: { pwaId, userId },
      ReturnValues: 'ALL_OLD',
    })
    .promise()
  return unmarshal(result.Attributes)
}

export const getByPwaIdPaginated = async (
  pwaId: string,
  startKey?: string
): Promise<ReviewResults> => {
  let dynamoStartKey: DynamoDB.Key | undefined
  if (startKey) {
    try {
      dynamoStartKey = JSON.parse(startKey)
    } catch {}
  }
  const batch = await getClient()
    .query({
      TableName: table.name.get(),
      IndexName: 'pwaKeyCreationDateOrdered',
      ExclusiveStartKey: dynamoStartKey,
      Limit: 10,
      KeyConditionExpression: '#pwaId = :v_pwaId',
      ExpressionAttributeNames: { '#pwaId': 'pwaId' },
      ExpressionAttributeValues: { ':v_pwaId': pwaId },
    })
    .promise()
  const results: any[] = []
  if (batch.Items) {
    results.push(...batch.Items.map(record => unmarshal(record)))
  }
  return { results: results, lastEvaluatedKey: batch.LastEvaluatedKey }
}

export const getByPwaId = async (
  pwaId: string,
  ProjectionExpression?: string
): Promise<Review[] | undefined> => {
  const result = await getClient()
    .query({
      TableName: table.name.get(),
      KeyConditionExpression: '#pwaId = :v_pwaId',
      ExpressionAttributeNames: { '#pwaId': 'pwaId' },
      ExpressionAttributeValues: { ':v_pwaId': pwaId },
      ProjectionExpression: ProjectionExpression,
    })
    .promise()
  return result.Items && unmarshalList(result.Items)
}

export const getByUserId = async (
  userId: string,
  ProjectionExpression?: string
): Promise<Review[] | undefined> => {
  const result = await getClient()
    .query({
      TableName: table.name.get(),
      IndexName: 'userKeyCreationDateOrdered',
      KeyConditionExpression: '#userId = :v_userId',
      ExpressionAttributeNames: { '#userId': 'userId' },
      ExpressionAttributeValues: { ':v_userId': userId },
      ProjectionExpression: ProjectionExpression,
    })
    .promise()
  return result.Items && unmarshalList(result.Items)
}
