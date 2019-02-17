import { User } from '../model/user'

export interface NewUser {
  email: string
  username: string
}

export const isValid = (newUser: NewUser): boolean => {
  return !!(newUser && newUser.email && newUser.username)
}

export const toUser = (newUser: NewUser): User => {
  return {
    id: '',
    email: newUser.email.toLowerCase(),
    username: newUser.username,
    profilePictureUrl: '',
    accountCreationDate: '',
    token: '',
    devToken: '',
    devTokenLastUpdatedDate: '',
  }
}
