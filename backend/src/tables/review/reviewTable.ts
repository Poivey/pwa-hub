import { Table } from '@pulumi/aws/dynamodb';
import { pwaUpdateTopic, userUpdateTopic } from '../../topics/tableSyncTopics';
import { updatePwaInfo, updateUserInfo } from './reviewTableSync';

export const table = new Table('review', {
  attributes: [
    { name: 'pwaId', type: 'S' },
    { name: 'userId', type: 'S' },
    { name: 'creationDate', type: 'S' },
  ],
  hashKey: 'pwaId',
  rangeKey: 'userId',
  writeCapacity: 1,
  readCapacity: 1,
  localSecondaryIndexes: [
    {
      name: 'pwaKeyCreationDateOrdered',
      rangeKey: 'creationDate',
      projectionType: 'INCLUDE',
      nonKeyAttributes: ['userId', 'username', 'content', 'rate'],
    },
  ],
  globalSecondaryIndexes: [
    {
      name: 'userKeyCreationDateOrdered',
      hashKey: 'userId',
      rangeKey: 'creationDate',
      projectionType: 'INCLUDE',
      nonKeyAttributes: ['pwaId', 'pwaName', 'content', 'rate'],
      readCapacity: 1,
      writeCapacity: 1,
    },
  ],
  billingMode: 'PROVISIONED',
})

userUpdateTopic.subscribe('updateReviewOnUserUpdate', updateUserInfo)
pwaUpdateTopic.subscribe('updateReviewOnPwaUpdate', updatePwaInfo)
