import { DynamoDB } from 'aws-sdk'
import { Review } from '../../entities/model/review'

export interface ReviewResults {
  results: Review[]
  lastEvaluatedKey?: DynamoDB.Key
}
