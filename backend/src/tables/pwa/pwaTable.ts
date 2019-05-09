import { Table } from '@pulumi/aws/dynamodb'
import { reviewUpdateTopic, userUpdateTopic } from '../../topics/tableSyncTopics'
import { updateCreatorInfo, updateFromReviewEvent } from './pwaTableSync'

export const table = new Table('pwa', {
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
      projectionType: 'KEYS_ONLY',
      readCapacity: 1,
      writeCapacity: 1,
    },
    {
      hashKey: 'category',
      name: 'search',
      projectionType: 'INCLUDE',
      rangeKey: 'popularity',
      nonKeyAttributes: [
        'id',
        'name',
        'nameLowerCase',
        'iconUrl',
        'creatorUsername',
        'rate',
        'reviewCount',
      ],
      readCapacity: 1,
      writeCapacity: 1,
    },
    {
      hashKey: 'creatorId',
      name: 'creatorId',
      projectionType: 'INCLUDE',
      rangeKey: 'popularity',
      nonKeyAttributes: [
        'id',
        'name',
        'nameLowerCase',
        'iconUrl',
        'rate',
        'reviewCount',
        'category',
      ],
      readCapacity: 1,
      writeCapacity: 1,
    },
  ],
  billingMode: 'PROVISIONED',
})

userUpdateTopic.subscribe('updatePwaOnUserUpdate', updateCreatorInfo)
reviewUpdateTopic.subscribe('updatePwaOnReviewUpdate', updateFromReviewEvent)
