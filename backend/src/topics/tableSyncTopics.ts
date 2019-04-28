import { Topic } from '@pulumi/cloud-aws'
import { User } from '../entities/model/user'
import { Review } from '../entities/model/review'
import { Pwa } from '../entities/model/pwa'

export const userUpdateTopic = new Topic<{ user: User }>('userUpdateTopic')

export const pwaUpdateTopic = new Topic<{ pwa: Pwa }>('pwaUpdateTopic')

export const reviewUpdateTopic = new Topic<{
  review: Review
  isDeleted?: boolean
  isNew?: boolean
  oldRate?: number
}>('reviewUpdateTopic')
