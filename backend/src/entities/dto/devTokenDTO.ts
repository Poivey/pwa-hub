import { User } from '../model/user'

export interface DevTokenDTO {
  devToken: string
}

export const userToDevTokenDTO = (user: User): DevTokenDTO => {
  return { devToken: user.devToken }
}
