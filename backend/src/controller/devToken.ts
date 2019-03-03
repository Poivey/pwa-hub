import { Request, Response } from '@pulumi/cloud'
import { v4 as uuid } from 'uuid'
import { userToDevTokenDTO } from '../entities/dto/devTokenDTO'
import { User } from '../entities/model/user'
import * as userTable from '../tables/user/queries'
import { userUpdateTopic } from '../topics/tableSync'

export const get = async (req: Request, res: Response) => {
  const id = req.params['id']
  try {
    const user: User | null = await userTable.getById(id)
    if (user) {
      res.status(200).json(userToDevTokenDTO(user))
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

export const generate = async (req: Request, res: Response) => {
  const id = req.params['id']
  try {
    const devToken = uuid()
    const user = await userTable.updateDevToken(id, devToken)
    await userUpdateTopic.publish({ user })
    res.status(201).json({ devToken })
    console.log(`POST ${req.path} => success`)
  } catch (err) {
    if (err.code === 'ConditionalCheckFailedException') {
      res.status(404).end()
      console.log(`POST ${req.path} => 404, user is missing`)
    } else {
      res.status(500).json(err.stack)
      console.log(`POST ${req.path} => error: ${err.stack}`)
    }
  }
}

export const destroy = async (req: Request, res: Response) => {
  const id = req.params['id']
  try {
    const user = await userTable.updateDevToken(id, '')
    await userUpdateTopic.publish({ user })
    res.status(200).end()
    console.log(`DELETE ${req.path} => success`)
  } catch (err) {
    if (err.code === 'ConditionalCheckFailedException') {
      res.status(404).end()
      console.log(`DELETE ${req.path} => 404, user is missing`)
    } else {
      res.status(500).json(err.stack)
      console.log(`DELETE ${req.path} => error: ${err.stack}`)
    }
  }
}
