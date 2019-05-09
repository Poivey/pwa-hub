// import { Request, Response, RouteHandler } from '@pulumi/cloud'
// import { API } from '@pulumi/cloud-aws'
// import * as devTokenController from './controller/devTokenController'
// import * as pwaController from './controller/pwaController'
// import * as reviewController from './controller/reviewController'
// import * as userController from './controller/userController'

// export const endpoint = new API('pwa-hub-endpoint')

// // const logRequest = (req: Request, res: Response, controllerHandler: RouteHandler) => {
// //   res.setHeader('Access-Control-Allow-Origin', '*')
// //   res.setHeader(
// //     'Access-Control-Allow-Headers',
// //     'Origin, X-Requested-With, Content-Type, Accept, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Cache-Control, Access-Control-Request-Headers, devToken, email'
// //   )
// //   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
// //   console.log(`${req.method} ${req.path}`)
// //   controllerHandler(req, res, () => undefined)
// // }

// // endpoint.options('/', logRequest, (req: Request, res: Response) => {
// //   res.status(204).end()
// // })
// // endpoint.options('/{route+}', logRequest, (req: Request, res: Response) => {
// //   res.status(204).end()
// // })

// endpoint.post('/api/pwa/{id}/reviews', reviewController.create) // auth
// endpoint.put('/api/pwa/{id}/reviews', reviewController.update) // auth
// endpoint.get('/api/pwa/{id}/reviews', reviewController.getBatch)
// endpoint.get('/api/pwa/{id}/reviews/{userId}', reviewController.getOne)

// endpoint.get('/api/pwa/{id}', pwaController.get)
// endpoint.put('/api/pwa/{id}', pwaController.update) // devToken
// endpoint.delete('/api/pwa/{id}/screenshots', pwaController.deleteScreenshots) // devToken
// endpoint.post('/api/pwa', pwaController.create) // devToken

// endpoint.get('/api/search/pwa/{category}', pwaController.searchInCategory)
// endpoint.get('/api/search/pwa', pwaController.search)

// endpoint.post('/api/users/{id}/devtoken', devTokenController.generate) // auth
// endpoint.get('/api/users/{id}/devtoken', devTokenController.get) // auth
// endpoint.delete('/api/users/{id}/devtoken', devTokenController.destroy) // auth

// endpoint.get('/api/users/{id}', userController.get)
// endpoint.put('/api/users/{id}', userController.update)
// endpoint.post('/api/users', userController.create) // temporary, ideally users should be managed by cognito

// endpoint.get('/api/login', userController.login) // temporary, no security

// // endpoint.post('/api/pwa/{id}/reviews', logRequest, reviewController.create) // auth
// // endpoint.put('/api/pwa/{id}/reviews', logRequest, reviewController.update) // auth
// // endpoint.get('/api/pwa/{id}/reviews', logRequest, reviewController.getBatch)
// // endpoint.get('/api/pwa/{id}/reviews/{userId}', logRequest, reviewController.getOne)

// // endpoint.get('/api/pwa/{id}', logRequest, pwaController.get)
// // endpoint.put('/api/pwa/{id}', logRequest, pwaController.update) // devToken
// // endpoint.delete('/api/pwa/{id}/screenshots', logRequest, pwaController.deleteScreenshots) // devToken
// // endpoint.post('/api/pwa', logRequest, pwaController.create) // devToken

// // endpoint.get('/api/search/pwa/{category}', logRequest, pwaController.searchInCategory)
// // endpoint.get('/api/search/pwa', logRequest, pwaController.search)

// // endpoint.post('/api/users/{id}/devtoken', logRequest, devTokenController.generate) // auth
// // endpoint.get('/api/users/{id}/devtoken', logRequest, devTokenController.get) // auth
// // endpoint.delete('/api/users/{id}/devtoken', logRequest, devTokenController.destroy) // auth

// // endpoint.get('/api/users/{id}', logRequest, userController.get)
// // endpoint.put('/api/users/{id}', logRequest, userController.update)
// // endpoint.post('/api/users', logRequest, userController.create) // temporary, ideally users should be managed by cognito

// // endpoint.get('/api/login', logRequest, userController.login) // temporary, no security
