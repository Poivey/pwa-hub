import { endpoint } from './src/router'
import { pwaIconsBucket } from './src/storage/pwa/pwaIconStorage'
import { screenshotsBucket } from './src/storage/pwa/pwaScreenshotStorage'
import { userPicturesBucket } from './src/storage/user/profilePictureStorage'

export const endpointUrl = endpoint.publish().url
export const pwaIconsBucketName = pwaIconsBucket.bucketDomainName
export const screenshotsBucketName = screenshotsBucket.bucketDomainName
export const userPicturesBucketName = userPicturesBucket.bucketDomainName

// Future ideas

// Cognito
//      1. use @pulumi/aws/cognito to authenticate users.
//         we may not need a full user table depending on the user info we will have thought that
//      2. use @pulumi/aws/apigateway to manage our endpoints with security where needed
//         we may need to change our handler signatures

// lambda on s3 upload : create a thumbnail to reduce image size for users when loading a pwa page.
