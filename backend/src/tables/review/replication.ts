import { getClient, marshalString } from '../util'
import { User } from '../../entities/model/user'
import { getByPwaId, getByUserId } from './queries'
import { table } from './table'
import { Pwa } from '../../entities/model/pwa'

export const updateUserInfo = async (updateData: { user: User }) => {
  const dynamoClient = getClient()
  const reviewsFromUser = await getByUserId(updateData.user.id, 'pwaId, userId')
  if (reviewsFromUser) {
    for (const review of reviewsFromUser) {
      await dynamoClient
        .update({
          TableName: table.name.get(),
          Key: { pwaId: review.pwaId, userId: review.userId },
          ConditionExpression: 'attribute_exists(#pwaId) AND attribute_exists(#userId)',
          UpdateExpression: 'SET #username = :v_username',
          ExpressionAttributeNames: {
            '#pwaId': 'pwaId',
            '#userId': 'userId',
            '#username': 'username',
          },
          ExpressionAttributeValues: {
            ':v_username': marshalString(updateData.user.username),
          },
        })
        .promise()
    }
  }
}

export const updatePwaInfo = async (updateData: { pwa: Pwa }) => {
  const dynamoClient = getClient()
  const reviewsForPwa = await getByPwaId(updateData.pwa.id, 'pwaId, userId')
  if (reviewsForPwa) {
    for (const review of reviewsForPwa) {
      await dynamoClient
        .update({
          TableName: table.name.get(),
          Key: { pwaId: review.pwaId, userId: review.userId },
          ConditionExpression: 'attribute_exists(#pwaId) AND attribute_exists(#userId)',
          UpdateExpression: 'SET #pwaName = :v_pwaName',
          ExpressionAttributeNames: {
            '#pwaId': 'pwaId',
            '#userId': 'userId',
            '#pwaName': 'pwaName',
          },
          ExpressionAttributeValues: {
            ':v_pwaName': marshalString(updateData.pwa.name),
          },
        })
        .promise()
    }
  }
}
