import { User } from '../../entities/model/user'
import { getClient, marshalString, marshal } from '../util'
import { getByCreatorId, getById } from './queries'
import { table } from './table'
import { Review, MAX_RATE } from '../../entities/model/review'
import { Pwa } from '../../entities/model/pwa'

export const updateCreatorInfo = async (updateData: { user: User }): Promise<void> => {
  const dynamoClient = getClient()
  const pwaFromUser = await getByCreatorId(updateData.user.id, 'id')
  console.log(`called update creator with creator id as : ${updateData.user.id}`)
  if (pwaFromUser) {
    for (const pwa of pwaFromUser) {
      await dynamoClient
        .update({
          TableName: table.name.get(),
          Key: { id: pwa.id },
          ConditionExpression: 'attribute_exists(#id)',
          UpdateExpression: 'SET #devToken = :v_devToken, #creatorUsername = :v_creatorUsername',
          ExpressionAttributeNames: {
            '#id': 'id',
            '#devToken': 'devToken',
            '#creatorUsername': 'creatorUsername',
          },
          ExpressionAttributeValues: {
            ':v_devToken': marshalString(updateData.user.devToken),
            ':v_creatorUsername': marshalString(updateData.user.username),
          },
        })
        .promise()
    }
  }
}

export const updateFromReviewEvent = async (event: {
  review: Review
  isDeleted?: boolean
  isNew?: boolean
  oldRate?: number
}) => {
  console.log(`called updateFromReviewEvent`)
  console.log(event)
  const storedPwa = await getById(event.review.pwaId)
  if (!storedPwa || !(event.isNew || event.isDeleted || !!event.oldRate) || !event.review) {
    console.log(`review event ${event.review.pwaId} / ${event.review.userId} discarded`)
    return
  }
  let updatedPwa: Pwa = storedPwa
  if (event.isNew) {
    updatedPwa = addReviewToPwa(storedPwa, event.review.rate)
  } else if (event.isDeleted) {
    updatedPwa = removeReviewFromPwa(storedPwa, event.review.rate)
  } else if (event.oldRate) {
    updatedPwa = updateReviewFromPwa(storedPwa, event.review.rate, event.oldRate)
  }
  await getClient()
    .put({
      TableName: table.name.get(),
      Item: marshal(updatedPwa),
    })
    .promise()
}

const addReviewToPwa = (pwa: Pwa, reviewRate: number): Pwa => {
  pwa.rate = (pwa.rate * pwa.reviewCount + reviewRate) / (pwa.reviewCount + 1)
  pwa.reviewCount += 1
  pwa.popularity = computePopularity(pwa.rate, pwa.reviewCount)
  return pwa
}
const removeReviewFromPwa = (pwa: Pwa, reviewRate: number): Pwa => {
  if (pwa.reviewCount > 1) {
    pwa.rate = (pwa.rate * pwa.reviewCount - reviewRate) / (pwa.reviewCount - 1)
    pwa.reviewCount -= 1
  }
  pwa.popularity = computePopularity(pwa.rate, pwa.reviewCount)
  return pwa
}
const updateReviewFromPwa = (pwa: Pwa, newReviewRate: number, oldReviewRate: number): Pwa => {
  pwa.rate += (newReviewRate - oldReviewRate) / pwa.reviewCount
  pwa.popularity = computePopularity(pwa.rate, pwa.reviewCount)
  return pwa
}
const computePopularity = (rate: number, reviewCount: number): number => {
  const decimalRate = rate / MAX_RATE
  const denominator = 1 / Math.log(reviewCount + 3) + 1
  return 1 - decimalRate / denominator
}
