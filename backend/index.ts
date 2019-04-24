import { API } from '@pulumi/cloud-aws'
import * as devTokenController from './src/controller/devToken'
import * as pwaController from './src/controller/pwa'
import * as userController from './src/controller/user'
import * as reviewController from './src/controller/review'

const endpoint = new API('pwa-hub-endpoint')

endpoint.post('/api/pwa/{id}/reviews', reviewController.create) // auth
endpoint.put('/api/pwa/{id}/reviews', reviewController.update) // auth
endpoint.get('/api/pwa/{id}/reviews', reviewController.getBatch)
endpoint.get('/api/pwa/{id}/reviews/{userId}', reviewController.getOne)

endpoint.get('/api/pwa/{id}', pwaController.get)
endpoint.put('/api/pwa/{id}', pwaController.update) // devToken
endpoint.delete('/api/pwa/{id}/screenshots', pwaController.deleteScreenshots) // devToken
endpoint.post('/api/pwa', pwaController.create) // devToken

endpoint.get('/api/search/pwa/{category}', pwaController.searchInCategory)
endpoint.get('/api/search/pwa', pwaController.search)

endpoint.post('/api/users/{id}/devtoken', devTokenController.generate) // auth
endpoint.get('/api/users/{id}/devtoken', devTokenController.get) // auth
endpoint.delete('/api/users/{id}/devtoken', devTokenController.destroy) // auth

endpoint.get('/api/users/{id}', userController.get)
endpoint.put('/api/users/{id}', userController.update)
// endpoint.delete('/api/users/{id}', userController.destroy) // auth
endpoint.post('/api/users', userController.create) // temporary, ideally users should be managed by cognito
endpoint.get('/api/login', userController.login) // temporary, no security

export const endpointUrl = endpoint.publish().url

// Future ideas

// Cognito
//      1. use @pulumi/aws/cognito to authenticate users.
//         we may not need a full user table depending on the user info we will have thought that
//      2. use @pulumi/aws/apigateway to manage our endpoints with security where needed
//         we may need to change our handler signatures

// lambda on s3 upload : create a thumbnail to reduce image size for users when loading a pwa page.
