import { API } from '@pulumi/cloud-aws'
import * as devTokenController from './src/lambdas/devToken'
import * as pwaController from './src/lambdas/pwa'
import * as userController from './src/lambdas/user'

const endpoint = new API('pwa-hub-endpoint')

endpoint.get('/api/pwa/{id}', pwaController.get)
endpoint.post('/api/pwa', pwaController.create) // (protégé)
// endpoint.delete('/api/pwa/{id}/screenshots/{index}') // (devToken)
// endpoint.delete('/api/pwa/{id}') // (devToken)
endpoint.get('/api/search/pwa/{category}', pwaController.searchInCategory)
endpoint.get('/api/search/pwa', pwaController.search)

endpoint.post('/api/users/{id}/devtoken', devTokenController.generate) // générer un nouveau devToken (protégé)
endpoint.get('/api/users/{id}/devtoken', devTokenController.get) // récupérer le devToken d'un user (protégé)
endpoint.delete('/api/users/{id}/devtoken', devTokenController.destroy) // supprimer le devToken (protégé)
endpoint.get('/api/users/{id}', userController.get) // get user info
endpoint.post('/api/users', userController.create) // create a new user :) - temporary, users should be created by cognito
endpoint.delete('/api/users/{id}', userController.destroy) // supprimer le user (protégé)

export const endpointUrl = endpoint.publish().url

// TODO dans l'immédiat
// DELETE /api/users/ID (et les pwa associées)
// DELETE /api/pwa/ID
// PUT /api/users/ID

// TODO commentaires
// DynamoDB table comment, hashkey pwaID, comme ça on peut les récupérer facile :)
// sortKey : date ? LSI : le plus utile ? aucune idée
// ça va faire une COMPOSITE KEY, voir la doc, et ça sera cool
// GSI : parentComment ! comme ça trop facile de faire des thread :)

// TODO Cognito
//      1. use @pululi/aws/cognito to authenticate users.
//         we may not need a full user table depending on the user info we will have thought that
//      2. use @pulumi/aws/apigateway to manage our endpoints with security where needed
//         we may need to change our handler signatures

// Future ideas
// lambda on s3 upload : create a thumbnail to reduce image size for users when loading a pwa page.
