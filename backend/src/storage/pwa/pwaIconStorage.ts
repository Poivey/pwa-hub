import { s3 } from '@pulumi/aws'
import { BucketEvent } from '@pulumi/aws/s3'
import * as pwaTable from '../../tables/pwa/queries'
import { deleteObject, getPwaTags } from '../util'

export const pwaIconsBucket = new s3.Bucket('pwa-icons')

const deleteIcon = async (key: string) => {
  await deleteObject(pwaIconsBucket.bucket.get(), key)
}

const onIconUpload = async (event: BucketEvent) => {
  console.log('call on icon upload')
  if (event.Records) {
    for (const record of event.Records) {
      const key: string = record.s3.object.key
      try {
        const uploadMetadata = await getPwaTags(key, pwaIconsBucket)
        if (
          uploadMetadata.pwaId &&
          uploadMetadata.devToken &&
          record.s3.object.size <= 2 * 1024 * 1024
        ) {
          const oldPwa = await pwaTable.updateIcon(
            key,
            uploadMetadata.pwaId,
            uploadMetadata.devToken
          )
          if (oldPwa.iconUrl) {
            await deleteIcon(oldPwa.iconUrl)
          }
          console.log(`new icon for pwa ${uploadMetadata.pwaId} : ${key}`)
        } else {
          await deleteIcon(key)
        }
      } catch (err) {
        if (err.code === 'ConditionalCheckFailedException' || err.code === 'NoSuchKey') {
          const decodedKey = decodeURI(key)
            .split('+')
            .join(' ')
          await deleteIcon(decodedKey)
        } else {
          console.log(`error while updating pwa icon : ${err.stack}`)
        }
      }
    }
  }
}

pwaIconsBucket.onObjectCreated('onIconUpload', onIconUpload)
