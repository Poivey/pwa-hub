import { Output } from '@pulumi/pulumi'
import { Table, API } from '@pulumi/cloud-aws'
import { Pwa } from './entities/pwa'

const endpoint = new API('pwa-hub-endpoint')

const pwaTable = new Table('pwa', 'id', 'string')

endpoint.get('/api/pwa/{id}', async (req, res) => {
  const id = req.params['id']
  try {
    const pwa: Pwa = await pwaTable.get({ id })
    if (pwa) {
      res.status(200).json(pwa)
      console.log(`GET /url/pwa/${id} => ${pwa}`)
    } else {
      res.status(404).json(pwa)
      console.log(`GET /url/pwa/${id} is missing`)
    }
  } catch (err) {
    res.status(500).json(err.stack)
    console.log(`GET /url/pwa/${id} error: ${err.stack}`)
  }
})

endpoint.post('/api/pwa', async (req, res) => {
  // TODO read body in a Pwa, return link to new pwa {link : /api/pwa/id, pwa: pwa}
  // const pwa: Pwa = req.body
})

export const endpointUrl = endpoint.publish().url
// read logs : pulumi logs --follow
