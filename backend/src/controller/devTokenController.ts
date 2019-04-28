import { Request, Response } from '@pulumi/cloud'
import { v4 as uuid } from 'uuid'
import { userToDevTokenDTO } from '../entities/dto/devTokenDTO'
import { User } from '../entities/model/user'
import * as userTable from '../tables/user/userQueries'
import { userUpdateTopic } from '../topics/tableSyncTopics'

export const get = async (req: Request, res: Response) => {
  const id = req.params['id']
  try {
    const user: User | undefined = await userTable.getById(id)
    if (user) {
      res.status(200).json(userToDevTokenDTO(user))
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).json(err.stack)
    console.log(`${req.method} ${req.path} => error: ${err.stack}`)
  }
}

export const generate = async (req: Request, res: Response) => {
  const id = req.params['id']
  try {
    const devToken = uuid()
    const user = await userTable.updateDevToken(id, devToken)
    await userUpdateTopic.publish({ user })
    res.status(201).json({ devToken })
  } catch (err) {
    if (err.code === 'ConditionalCheckFailedException') {
      res.status(404).end()
    } else {
      res.status(500).json(err.stack)
      console.log(`${req.method} ${req.path} => error: ${err.stack}`)
    }
  }
}

export const destroy = async (req: Request, res: Response) => {
  const id = req.params['id']
  try {
    const user = await userTable.updateDevToken(id, '')
    await userUpdateTopic.publish({ user })
    res.status(200).end()
  } catch (err) {
    if (err.code === 'ConditionalCheckFailedException') {
      res.status(404).end()
    } else {
      res.status(500).json(err.stack)
      console.log(`${req.method} ${req.path} => error: ${err.stack}`)
    }
  }
}
