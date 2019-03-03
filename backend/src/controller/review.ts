import { Request, Response } from '@pulumi/cloud'
import { Review } from '../entities/model/review'
import * as newReviewReq from '../entities/requests/newReview'
import * as reviewTable from '../tables/review/queries'
import { reviewUpdateTopic } from '../topics/tableSync'

export const create = async (req: Request, res: Response) => {
  const pwaId = req.params['id']
  const body: newReviewReq.NewReview = JSON.parse(req.body.toString())
  if (!newReviewReq.isValid(body)) {
    res.status(400).json(`Invalid request`)
    return
  }
  const review: Review = newReviewReq.toReview(body)
  review.pwaId = pwaId
  try {
    if (await reviewTable.existById(review.pwaId, review.userId)) {
      res
        .status(409)
        .json(`review with from user ${review.userId} on pwa ${review.pwaId} already exist !`)
      console.log(`POST ${req.path} => 409, ${review.pwaId} / ${review.userId} already exist`)
      return
    }
    const saved: Review = await reviewTable.create(review)
    await reviewUpdateTopic.publish({ review: saved, isNew: true })
    res.status(201).json(saved)
    console.log(`POST ${req.path} => created review : ${saved.pwaId} / ${saved.userId})`)
  } catch (err) {
    res.status(500).end()
    console.log(review)
    console.log(`POST ${req.path} => error: ${err.stack}`)
  }
}

export const update = async (req: Request, res: Response) => {
  const pwaId = req.params['id']
  const body: newReviewReq.NewReview = JSON.parse(req.body.toString())
  if (!newReviewReq.isValid(body)) {
    res.status(400).json(`Invalid request`)
    return
  }
  const review: Review = newReviewReq.toReview(body)
  review.pwaId = pwaId
  try {
    if (!(await reviewTable.existById(review.pwaId, review.userId))) {
      res.status(404).end()
      console.log(`PUT ${req.path} => 404, ${review.pwaId} / ${review.userId} doesn't exist`)
      return
    }
    const oldReview: Review = await reviewTable.update(
      review.pwaId,
      review.userId,
      reviewTable.parseRate(review.rate),
      review.content
    )
    const oldRate = oldReview.rate
    const updatedReview = oldReview
    updatedReview.rate = review.rate
    updatedReview.content = review.content
    await reviewUpdateTopic.publish({ review: updatedReview, oldRate })
    res.status(204).end()
    console.log(`PUT ${req.path} => updated review : ${review.pwaId} / ${review.userId})`)
  } catch (err) {
    res.status(500).end()
    console.log(review)
    console.log(`PUT ${req.path} => error: ${err.stack}`)
  }
}

export const getBatch = async (req: Request, res: Response) => {
  let startKey = req.query && req.query.startKey
  const pwaId = req.params['id']
  if (typeof startKey !== 'string') {
    startKey = ''
  }
  try {
    const searchResult = await reviewTable.getByPwaIdPaginated(pwaId, startKey)
    res.status(200).json(searchResult)
  } catch (err) {
    res.status(500).end()
    console.log(`GET ${req.path} => error: ${err.stack}`)
  }
}
