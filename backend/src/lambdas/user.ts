import { Request, Response } from '@pulumi/cloud'
import { userToUserDTO } from '../entities/dto/userDTO'
import { User } from '../entities/model/user'
import * as newUserReq from '../entities/requests/newUser'
import * as userTable from '../tables/user/queries'
import * as pwaTable from '../tables/pwa/queries'

export const get = async (req: Request, res: Response) => {
  const id = req.params['id']
  try {
    const user: User | null = await userTable.getById(id)
    if (user) {
      const pwas = await pwaTable.getByCreatorId(id)
      res.status(200).json({ user: userToUserDTO(user), pwas: pwas }) // if requester is user : use userToUserDTOWithEmail
      console.log(`GET ${req.path} => success`)
    } else {
      res.status(404).end()
      console.log(`GET ${req.path} => 404, user is missing`)
    }
  } catch (err) {
    res.status(500).json(err.stack)
    console.log(`GET ${req.path} => error: ${err.stack}`)
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
      console.log(`POST ${req.path} => 409 conflict, user : ${user.email} already exist`)
      return
    }
    const saved: User = await userTable.create(user)
    res
      .status(201)
      .setHeader(`Content-Location`, `/api/user/${user.id}`)
      .json(saved)
    console.log(
      `POST ${req.path} => created user : ${user.username}(${user.email}) with id ${user.id}`
    )
  } catch (err) {
    res.status(500).end()
    console.log(user)
    console.log(`POST ${req.path} => error: ${err.stack}`)
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
      console.log(`DELETE ${req.path} => 404, user is missing`)
    }
  } catch (err) {
    res.status(500).json(err.stack)
    console.log(`DELETE ${req.path} => error: ${err.stack}`)
  }
}
