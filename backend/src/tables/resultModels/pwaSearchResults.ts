import { DynamoDB } from 'aws-sdk'
import { Pwa } from '../../entities/model/pwa'

export interface PwaSearchResults {
  results: Pwa[]
  lastEvaluatedKey?: DynamoDB.Key
}
