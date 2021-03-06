import { Table } from '@pulumi/aws/dynamodb'

export const table = new Table('user', {
  attributes: [
    { name: 'id', type: 'S' },
    { name: 'email', type: 'S' },
    { name: 'devToken', type: 'S' },
  ],
  hashKey: 'id',
  writeCapacity: 1,
  readCapacity: 1,
  globalSecondaryIndexes: [
    {
      hashKey: 'email',
      name: 'emailKeysOnly',
      projectionType: 'KEYS_ONLY',
      readCapacity: 1,
      writeCapacity: 1,
    },
    {
      hashKey: 'devToken',
      name: 'devTokenIndex',
      projectionType: 'INCLUDE',
      nonKeyAttributes: ['username', 'id'],
      readCapacity: 1,
      writeCapacity: 1,
    },
  ],
  billingMode: 'PROVISIONED',
})
