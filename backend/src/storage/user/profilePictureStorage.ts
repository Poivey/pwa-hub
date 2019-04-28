import { s3 } from '@pulumi/aws'
import { BucketEvent } from '@pulumi/aws/s3'
import * as userTable from '../../tables/user/queries'
import { deleteObject, getUserTags } from '../util'

export const userPicturesBucket = new s3.Bucket('user-profile-picture')

const deletePicture = async (key: string) => {
  await deleteObject(userPicturesBucket.bucket.get(), key)
}

const onProfilePictureUpload = async (event: BucketEvent) => {
  console.log('call on profile picture upload')
  if (event.Records) {
    for (const record of event.Records) {
      const key: string = record.s3.object.key
      try {
        const uploadMetadata = await getUserTags(key, userPicturesBucket)
        if (
          uploadMetadata.userId &&
          uploadMetadata.email &&
          record.s3.object.size <= 2 * 1024 * 1024
        ) {
          const oldUser = await userTable.updateProfilePicture(
            key,
            uploadMetadata.userId,
            uploadMetadata.email
          )
          if (oldUser.profilePictureUrl) {
            await deletePicture(oldUser.profilePictureUrl)
          }
          console.log(`new profile picture for user ${uploadMetadata.userId} : ${key}`)
        } else {
          await deletePicture(key)
        }
      } catch (err) {
        if (err.code === 'ConditionalCheckFailedException' || err.code === 'NoSuchKey') {
          const decodedKey = decodeURI(key)
            .split('+')
            .join(' ')
          await deletePicture(decodedKey)
        } else {
          console.log(`error while updating profile picture : ${err.stack}`)
        }
      }
    }
  }
}

userPicturesBucket.onObjectCreated('onProfilePictureUpload', onProfilePictureUpload)
