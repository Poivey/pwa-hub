import { BucketEvent } from '@pulumi/aws/s3'
import { Request, Response } from '@pulumi/cloud'
import { pwaToPwaDTO } from '../entities/dto/pwaDTO'
import { Pwa } from '../entities/model/pwa'
import * as newPwaReq from '../entities/requests/newPwa'
import * as pwaStorage from '../storage/pwaStorage'
import * as pwaTable from '../tables/pwa/queries'

export const get = async (req: Request, res: Response) => {
  const id = req.params['id']
  try {
    const pwa: Pwa | null = await pwaTable.getById(id)
    if (pwa) {
      res.status(200).json(pwaToPwaDTO(pwa))
      console.log(`GET ${req.path} => success`)
    } else {
      res.status(404).end()
      console.log(`GET ${req.path} => 404, pwa is missing`)
    }
  } catch (err) {
    res.status(500).json(err.stack)
    console.log(`GET ${req.path} => error: ${err.stack}`)
  }
}

export const create = async (req: Request, res: Response) => {
  const body: newPwaReq.NewPwa = JSON.parse(req.body.toString())
  if (!newPwaReq.isValid(body)) {
    res.status(400).json(`Invalid request`)
    return
  }

  const pwa: Pwa = newPwaReq.toPwa(body)

  // TODO get user from dev token in header, if he doesn't exist : error

  // 3. get no pwa from pwa url
  if (await pwaTable.existByUrl(pwa.url)) {
    res.status(409).json(`pwa with url ${pwa.url} already exist !`)
    console.log(`POST ${req.path} => 409 conflict, pwa : ${pwa.url} already exist`)
    return
  }

  try {
    const saved: Pwa = await pwaTable.create(pwa)
    res
      .status(201)
      .setHeader(`Content-Location`, `/api/pwa/${pwa.id}`)
      .json(pwaToPwaDTO(saved))
    console.log(`POST ${req.path} => created pwa : ${pwa.url} with id ${pwa.id}`)
  } catch (err) {
    res.status(500).end()
    console.log(pwa)
    console.log(`POST ${req.path} => error: ${err.stack}`)
  }
}

export const search = async (req: Request, res: Response) => {
  const input = req.query.input
  let startKey = req.query.startKey
  if (input && typeof input === 'string') {
    if (typeof startKey !== 'string') {
      startKey = ''
    }
    try {
      const searchResult = await pwaTable.searchInAll(input, 10, startKey)
      res.status(200).json(searchResult)
    } catch (err) {
      res.status(500).end()
      console.log(`GET ${req.path} => error: ${err.stack}`)
    }
  } else {
    res.status(400).end()
  }
}

export const searchInCategory = async (req: Request, res: Response) => {
  let input = req.query.input
  let startKey = req.query.startKey
  const category = req.params['category']
  if (!input || typeof input !== 'string') {
    input = ''
  }
  if (typeof startKey !== 'string') {
    startKey = ''
  }
  try {
    const searchResult = await pwaTable.searchInCategory(input, category, 10, startKey)
    res.status(200).json(searchResult)
  } catch (err) {
    res.status(500).end()
    console.log(`GET ${req.path} => error: ${err.stack}`)
  }
}

// TODO move to storage
// TODO control max size through record.s3.object.size
const onScreenshotUpload = (event: BucketEvent) => {
  console.log('call on Screenshot Upload')
  if (event.Records) {
    event.Records.forEach(async record => {
      const key: string = record.s3.object.key
      try {
        const uploadMetadata = await pwaStorage.getScreenshotUploadTag(key)
        if (uploadMetadata.devToken && uploadMetadata.pwaID) {
          await pwaTable.addScreenshot(key, uploadMetadata.pwaID, uploadMetadata.devToken)
          console.log(`new screenshot for pwa ${uploadMetadata.pwaID} : ${key}`)
        } else {
          await pwaStorage.deleteScreenshot(key)
        }
      } catch (err) {
        if (err.code === 'ConditionalCheckFailedException') {
          await pwaStorage.deleteScreenshot(key)
        } else {
          console.log(`error while updating screenshot : ${err.stack}`)
        }
      }
    })
  }
}
pwaStorage.screenshotsBucket.onObjectCreated('onScreenshotUpload', onScreenshotUpload)
