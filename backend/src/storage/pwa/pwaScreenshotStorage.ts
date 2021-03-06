import { s3 } from '@pulumi/aws'
import { BucketEvent, PublicReadWriteAcl } from '@pulumi/aws/s3'
import * as pwaTable from '../../tables/pwa/pwaQueries'
import { deleteObject, getPwaTags, publicGetPutPolicyForBucket } from '../util'

export const screenshotsBucket = new s3.Bucket('pwa-screenshots', {
  acl: PublicReadWriteAcl,
  corsRules: [
    {
      allowedMethods: ['GET', 'PUT'],
      allowedOrigins: ['*'],
      allowedHeaders: ['*'],
    },
  ],
})

new s3.BucketPolicy('bucketPolicyScreenshot', {
  bucket: screenshotsBucket.bucket,
  policy: screenshotsBucket.bucket.apply(publicGetPutPolicyForBucket),
})

export const deleteScreenshot = async (key: string) => {
  await deleteObject(screenshotsBucket.bucket.get(), key)
}

const onScreenshotUpload = async (event: BucketEvent) => {
  console.log('call on screenshot upload')
  if (event.Records) {
    for (const record of event.Records) {
      const key: string = record.s3.object.key
      try {
        const uploadMetadata = await getPwaTags(key, screenshotsBucket)
        if (
          uploadMetadata.devToken &&
          uploadMetadata.pwaId &&
          record.s3.object.size <= 2 * 1024 * 1024
        ) {
          await pwaTable.addScreenshot(key, uploadMetadata.pwaId, uploadMetadata.devToken)
          console.log(`new screenshot for pwa ${uploadMetadata.pwaId} : ${key}`)
        } else {
          await deleteScreenshot(key)
        }
      } catch (err) {
        if (err.code === 'ConditionalCheckFailedException' || err.code === 'NoSuchKey') {
          const decodedKey = decodeURI(key)
            .split('+')
            .join(' ')
          await deleteScreenshot(decodedKey)
        } else {
          console.log(`error while updating screenshot : ${err.stack}`)
        }
      }
    }
  }
}

screenshotsBucket.onObjectCreated('onScreenshotUpload', onScreenshotUpload)
