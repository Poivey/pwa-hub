import { Pwa } from '../../entities/model/pwa'
import { DynamoDB } from 'aws-sdk'

export interface PwaSearchResults {
  results: Pwa[]
  lastEvaluatedKey?: DynamoDB.Key
}
