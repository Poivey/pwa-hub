import { User } from '../model/user'

export interface UserDTO {
  id: string
  email?: string
  username: string
  profilePictureUrl: string
  accountCreationDate: string
}

export const userToUserDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    username: user.username,
    profilePictureUrl: user.profilePictureUrl,
    accountCreationDate: user.accountCreationDate,
  }
}

export const userToUserDTOWithEmail = (user: User): UserDTO => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    profilePictureUrl: user.profilePictureUrl,
    accountCreationDate: user.accountCreationDate,
  }
}
