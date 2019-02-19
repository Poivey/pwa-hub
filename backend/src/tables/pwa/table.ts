import { Table } from '@pulumi/aws/dynamodb'
import { userUpdateTopic } from '../../topics/tableSync'
import { updateCreatorInfo } from './replication'

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
      nonKeyAttributes: ['id', 'name', 'iconUrl', 'reviewCount'],
      readCapacity: 1,
      writeCapacity: 1,
    },
  ],
  billingMode: 'PROVISIONED',
})

userUpdateTopic.subscribe('onUserUpdate', updateCreatorInfo)
