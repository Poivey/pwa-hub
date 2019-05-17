import * as aws from 'aws-sdk'
import { v4 as uuid } from 'uuid'

export const defaultUserPictureUrl = 'https://api.adorable.io/avatars/256/'
export const defaultPwaIcon = 'empty-256x256.png'

const pictureBucket = 'user-profile-picture-3434e5e'
const pwaIconBucket = 'pwa-icons-caaaaa2'
const screenshotBucket = 'pwa-screenshots-c0b63c6'

export const pictureBucketUrl = `https://s3.eu-central-1.amazonaws.com/${pictureBucket}/`
export const pwaIconBucketUrl = `https://s3.eu-central-1.amazonaws.com/${pwaIconBucket}/`
export const screenshotBucketUrl = `https://s3.eu-central-1.amazonaws.com/${screenshotBucket}/`

export const uploadUserPicture = (file, userId, email) => {
  aws.config.update({
    region: 'eu-central-1',
    credentials: new aws.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-central-1:b0e6c927-9364-4964-a251-0e1257b7cd3e',
    }),
  })
  const bucket = new aws.S3({
    apiVersion: 'latest',
    params: {
      Bucket: pictureBucket,
    },
  })
  return bucket
    .upload({
      Key: `${uuid()}.${file.name.split('.').pop()}`,
      Body: file,
      ACL: 'public-read',
      Tagging: `userId=${userId}&email=${email}`,
    })
    .promise()
}

export const uploadPwaIcon = (file, pwaId, devToken) => {
  aws.config.update({
    region: 'eu-central-1',
    credentials: new aws.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-central-1:b0e6c927-9364-4964-a251-0e1257b7cd3e',
    }),
  })
  const bucket = new aws.S3({
    apiVersion: 'latest',
    params: {
      Bucket: pwaIconBucket,
    },
  })
  return bucket
    .upload({
      Key: `${uuid()}.${file.name.split('.').pop()}`,
      Body: file,
      ACL: 'public-read',
      Tagging: `pwaId=${pwaId}&devToken=${devToken}`,
    })
    .promise()
}

export const uploadPwaScreenshot = (file, pwaId, devToken) => {
  aws.config.update({
    region: 'eu-central-1',
    credentials: new aws.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-central-1:b0e6c927-9364-4964-a251-0e1257b7cd3e',
    }),
  })
  const bucket = new aws.S3({
    apiVersion: 'latest',
    params: {
      Bucket: screenshotBucket,
    },
  })
  return bucket
    .upload({
      Key: `${uuid()}.${file.name.split('.').pop()}`,
      Body: file,
      ACL: 'public-read',
      Tagging: `pwaId=${pwaId}&devToken=${devToken}`,
    })
    .promise()
}
