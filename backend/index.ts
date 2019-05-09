import { pwaIconsBucket } from './src/storage/pwa/pwaIconStorage'
import { screenshotsBucket } from './src/storage/pwa/pwaScreenshotStorage'
import { userPicturesBucket } from './src/storage/user/profilePictureStorage'
import { API } from '@pulumi/cloud-aws'
import { Request, Response, RouteHandler } from '@pulumi/cloud'
import * as devTokenController from './src/controller/devTokenController'
import * as pwaController from './src/controller/pwaController'
import * as reviewController from './src/controller/reviewController'
import * as userController from './src/controller/userController'

const endpoint = new API('pwa-hub-endpoint')

const logRequest = (req: Request, res: Response, controllerHandler: RouteHandler) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Cache-Control, Access-Control-Request-Headers, devToken, email'
  )
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
  console.log(`${req.method} ${req.path}`)
  controllerHandler(req, res, () => undefined)
}

endpoint.options('/', logRequest, (req: Request, res: Response) => {
  res.status(204).end()
})
endpoint.options('/{route+}', logRequest, (req: Request, res: Response) => {
  res.status(204).end()
})

endpoint.post('/api/pwa/{id}/reviews', logRequest, reviewController.create) // auth
endpoint.put('/api/pwa/{id}/reviews', logRequest, reviewController.update) // auth
endpoint.get('/api/pwa/{id}/reviews', logRequest, reviewController.getBatch)
endpoint.get('/api/pwa/{id}/reviews/{userId}', logRequest, reviewController.getOne)

endpoint.get('/api/pwa/{id}', logRequest, pwaController.get)
endpoint.put('/api/pwa/{id}', logRequest, pwaController.update) // devToken
endpoint.delete('/api/pwa/{id}/screenshots', logRequest, pwaController.deleteScreenshots) // devToken
endpoint.post('/api/pwa', logRequest, pwaController.create) // devToken

endpoint.get('/api/search/pwa/{category}', logRequest, pwaController.searchInCategory)
endpoint.get('/api/search/pwa', logRequest, pwaController.search)

endpoint.post('/api/users/{id}/devtoken', logRequest, devTokenController.generate) // auth
endpoint.get('/api/users/{id}/devtoken', logRequest, devTokenController.get) // auth
endpoint.delete('/api/users/{id}/devtoken', logRequest, devTokenController.destroy) // auth

endpoint.get('/api/users/{id}', logRequest, userController.get)
endpoint.put('/api/users/{id}', logRequest, userController.update)
endpoint.post('/api/users', logRequest, userController.create) // temporary, ideally users should be managed by cognito

endpoint.get('/api/login', logRequest, userController.login) // temporary, no security

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
