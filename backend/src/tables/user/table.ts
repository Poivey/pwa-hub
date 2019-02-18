import { Table } from '@pulumi/aws/dynamodb'

export const table = new Table('user', {
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
