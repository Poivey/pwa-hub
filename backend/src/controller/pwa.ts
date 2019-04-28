import { Request, Response } from '@pulumi/cloud'
import { pwaToPwaDTO } from '../entities/dto/pwaDTO'
import { Pwa } from '../entities/model/pwa'
import { User } from '../entities/model/user'
import * as newPwaReq from '../entities/requests/newPwa'
import * as pwaStorage from '../storage/pwaStorage'
import * as pwaTable from '../tables/pwa/queries'
import * as userTable from '../tables/user/queries'
import { pwaUpdateTopic } from '../topics/tableSync'

export const get = async (req: Request, res: Response) => {
  const id = req.params['id']
  try {
    const pwa: Pwa | undefined = await pwaTable.getById(id)
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
  const devToken = req.headers && req.headers.devtoken
  if (!newPwaReq.isValid(body)) {
    res.status(400).json(`Invalid request`)
    return
  }
  const pwa: Pwa = newPwaReq.toPwa(body)
  const user: User | undefined = await userTable.getByDevToken(devToken as string)
  if (!user) {
    res.status(400).json(`invalid devToken`)
    return
  } else {
    pwa.devToken = user.devToken
    pwa.creatorId = user.id
    pwa.creatorUsername = user.username
  }
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

export const update = async (req: Request, res: Response) => {
  const id = req.params['id']
  const devToken = req.headers && req.headers.devtoken
  const pwaUpdatedFields: newPwaReq.NewPwa = JSON.parse(req.body.toString())
  if (!newPwaReq.isValid(pwaUpdatedFields)) {
    res.status(400).json(`Invalid request, informations missing or PWA unknown`)
    return
  }
  try {
    const updatedPwa = await pwaTable.partialUpdate(pwaUpdatedFields, id, devToken as string)
    await pwaUpdateTopic.publish({ pwa: updatedPwa })
    res.status(200).json({ pwa: pwaToPwaDTO(updatedPwa) })
  } catch (err) {
    if (err.code === 'ConditionalCheckFailedException') {
      res.status(403).end()
    } else {
      res.status(500).end()
      console.log(pwaUpdatedFields)
      console.log(`PUT ${req.path} => error: ${err.stack}`)
    }
  }
}

export const search = async (req: Request, res: Response) => {
  const input = req.query && req.query.input
  const startKey = req.query && req.query.startKey
  if (input) {
    try {
      const searchResult = await pwaTable.searchInAll(input as string, 10, startKey as string)
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
  const input = req.query && req.query.input
  const startKey = req.query && req.query.startKey
  const category = req.params['category']
  try {
    const searchResult = await pwaTable.searchInCategory(
      input as string,
      category,
      10,
      startKey as string
    )
    res.status(200).json(searchResult)
  } catch (err) {
    res.status(500).end()
    console.log(`GET ${req.path} => error: ${err.stack}`)
  }
}

export const deleteScreenshots = async (req: Request, res: Response) => {
  const id = req.params['id']
  const screenshotsIndexesRaw = req.query.screenshotsIndexes
  const devToken = req.headers && req.headers.devtoken
  const screenshotsIndexes =
    screenshotsIndexesRaw &&
    (screenshotsIndexesRaw as string)
      .split(',')
      .map(Number)
      .filter(index => !isNaN(index))
  if (!screenshotsIndexes || !screenshotsIndexes.length) {
    res.status(400).end()
    console.log('no numeric indexes given')
    return
  }
  try {
    const oldPwa = await pwaTable.deleteScreenshots(screenshotsIndexes, id, devToken as string)
    for (const index of screenshotsIndexes) {
      await pwaStorage.deleteScreenshot(oldPwa.screenshots[index])
    }
    res.status(200).end()
  } catch (err) {
    if (err.code === 'ConditionalCheckFailedException') {
      res.status(403).end()
    } else if (err.code === 'MissingRequiredParameter') {
      res.status(400).json('one or more screenshots indexes is invalid')
    } else {
      res.status(500).end()
      console.log(`DELETE ${req.path} => error: ${err.stack}`)
    }
  }
}
