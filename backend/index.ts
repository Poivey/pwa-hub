import { API } from '@pulumi/cloud-aws'
import * as devTokenController from './src/lambdas/devToken'
import * as pwaController from './src/lambdas/pwa'
import * as userController from './src/lambdas/user'
import * as reviewController from './src/lambdas/review'

const endpoint = new API('pwa-hub-endpoint')

endpoint.post('/api/pwa/{id}/reviews', reviewController.create) // auth
endpoint.put('/api/pwa/{id}/reviews', reviewController.update) // auth
endpoint.get('/api/pwa/{id}/reviews', reviewController.getBatch)
endpoint.get('/api/pwa/{id}', pwaController.get)
endpoint.post('/api/pwa', pwaController.create) // devToken

endpoint.get('/api/search/pwa/{category}', pwaController.searchInCategory)
endpoint.get('/api/search/pwa', pwaController.search)

endpoint.post('/api/users/{id}/devtoken', devTokenController.generate) // auth
endpoint.get('/api/users/{id}/devtoken', devTokenController.get) // auth
endpoint.delete('/api/users/{id}/devtoken', devTokenController.destroy) // auth
endpoint.get('/api/users/{id}', userController.get)
endpoint.delete('/api/users/{id}', userController.destroy) // auth
endpoint.post('/api/users', userController.create) // temporary, ideally users should be created by cognito

export const endpointUrl = endpoint.publish().url

// TODO soon
// DELETE /api/users/ID (and created pwas)
// DELETE /api/pwa/ID
// DELETE /api/pwa/ID/screenshots/INDEX
// PUT for user and pwa info
// Handle user and pwa 'avatar'

// TODO Cognito
//      1. use @pulumi/aws/cognito to authenticate users.
//         we may not need a full user table depending on the user info we will have thought that
//      2. use @pulumi/aws/apigateway to manage our endpoints with security where needed
//         we may need to change our handler signatures

// Future ideas
// lambda on s3 upload : create a thumbnail to reduce image size for users when loading a pwa page.
