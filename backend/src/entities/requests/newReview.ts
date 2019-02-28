import { Review } from '../model/review'

export interface NewReview {
  userId: string // TODO remove userId from request when authentication is set
  content: string
  rate: number
}

export const isValid = (newReview: NewReview): boolean => {
  return !!(newReview && newReview.userId && newReview.content && newReview.rate)
}

export const toReview = (newReview: NewReview): Review => {
  return {
    pwaId: '',
    userId: newReview.userId,
    creationDate: '',
    pwaName: '',
    username: '',
    content: newReview.content,
    rate: newReview.rate,
  }
}
