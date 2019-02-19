import { User } from '../../entities/model/user'
import * as userTable from '../user/queries'
import { getClient, marshalString } from '../util'
import { getByCreatorId } from './queries'
import { table } from './table'

export const updateCreatorInfo = async (updateData: { id: string }): Promise<void> => {
  const dynamoClient = getClient()
  const pwaFromUser = await getByCreatorId(updateData.id, 'id')
  console.log(`called update creator with creator id as : ${updateData.id}`)
  if (pwaFromUser) {
    const user: User | null = await userTable.getById(updateData.id)
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
