import { Request, Response } from '@pulumi/cloud'
import { userToUserDTO, userToUserDTOWithEmail } from '../entities/dto/userDTO'
import { pwaToPwaDTO } from '../entities/dto/pwaDTO'
import { User } from '../entities/model/user'
import * as newUserReq from '../entities/requests/newUser'
import * as pwaTable from '../tables/pwa/pwaQueries'
import * as userTable from '../tables/user/userQueries'
import { userUpdateTopic } from '../topics/tableSyncTopics'

export const get = async (req: Request, res: Response) => {
  const id = req.params['id']
  try {
    const user: User | undefined = await userTable.getById(id)
    if (user) {
      const pwas = await pwaTable.getByCreatorId(id)
      const pwasDTO = (pwas || []).map(pwaToPwaDTO)
      res.status(200).json({ user: userToUserDTO(user), pwas: pwasDTO })
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).json(err.stack)
    console.log(`${req.method} ${req.path} => error: ${err.stack}`)
  }
}

export const create = async (req: Request, res: Response) => {
  const body: newUserReq.NewUser = JSON.parse(req.body.toString())
  if (!newUserReq.isValid(body)) {
    res.status(400).json(`Invalid request`)
    return
  }
  const user: User = newUserReq.toUser(body)
  try {
    if (await userTable.existByEmail(user.email)) {
      res.status(409).json(`user with email ${user.email} already exist !`)
      return
    }
    const saved: User = await userTable.create(user)
    res
      .status(201)
      .setHeader(`Content-Location`, `/api/user/${user.id}`)
      .json(saved)
    console.log(`${req.method} ${req.path} => user created : ${user.email}, id ${user.id}`)
  } catch (err) {
    res.status(500).end()
    console.log(`${req.method} ${req.path} => error: ${err.stack}`)
  }
}

export const update = async (req: Request, res: Response) => {
  const id = req.params['id']
  const email = req.headers && req.headers.email // email acts as an identification token for the time being
  const userUpdatedFields: newUserReq.NewUser = JSON.parse(req.body.toString())
  if (!newUserReq.isValid(userUpdatedFields)) {
    res.status(400).json(`Invalid request, user informations missing`)
    return
  }
  try {
    const userIdForNewEmail = await userTable.existByEmail(userUpdatedFields.email)
    if (userIdForNewEmail && userIdForNewEmail !== id) {
      res.status(409).end()
    } else {
      const updatedUser = await userTable.partialUpdate(userUpdatedFields, id, email as string)
      await userUpdateTopic.publish({ user: updatedUser })
      res.status(200).json(userToUserDTOWithEmail(updatedUser))
    }
  } catch (err) {
    if (err.code === 'ConditionalCheckFailedException') {
      res.status(403).end()
    } else {
      res.status(500).end()
      console.log(`${req.method} ${req.path} => error: ${err.stack}`)
    }
  }
}

export const destroy = async (req: Request, res: Response) => {
  const id = req.params['id']
  try {
    const isDestroyed = await userTable.destroy(id)
    if (isDestroyed) {
      res.status(200).end()
      console.log(`DELETE ${req.path} => success`)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).json(err.stack)
    console.log(`${req.method} ${req.path} => error: ${err.stack}`)
  }
}

export const login = async (req: Request, res: Response) => {
  const email = req.headers && req.headers.email
  if (email) {
    const id = await userTable.existByEmail(email as string)
    if (id) {
      res.status(200).json({ id })
    } else {
      res.status(404).end()
    }
  } else {
    res.status(400).end()
  }
}
