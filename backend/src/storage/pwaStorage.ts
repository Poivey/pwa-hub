import { s3 } from '@pulumi/aws'
import { BucketEvent } from '@pulumi/aws/s3'
import * as pwaTable from '../tables/pwa/queries'
import { deleteObject, getObjectTags } from './util'

export const screenshotsBucket = new s3.Bucket('pwa-screenshots') // configurer, écriture : tout le monde, lecture : tout le monde, delete : que moi

export const getScreenshotUploadTag = async (key: string): Promise<ScreenshotTags> => {
  const tags: ScreenshotTags = {}
  const fullTags = await getObjectTags(screenshotsBucket.bucket.get(), key)
  fullTags.forEach(tag => {
    if (tag.Key.toLowerCase() === 'pwaid') {
      tags.pwaID = tag.Value
    }
    if (tag.Key.toLowerCase() === 'devtoken') {
      tags.devToken = tag.Value
    }
  })
  return tags
}

export const deleteScreenshot = async (key: string) => {
  await deleteObject(screenshotsBucket.bucket.get(), key)
}

export interface ScreenshotTags {
  devToken?: string
  pwaID?: string
}

const onScreenshotUpload = async (event: BucketEvent) => {
  console.log('call on Screenshot Upload')
  if (event.Records) {
    for (const record of event.Records) {
      console.log(record)
      const key: string = record.s3.object.key
      try {
        const uploadMetadata = await getScreenshotUploadTag(key)
        if (
          uploadMetadata.devToken &&
          uploadMetadata.pwaID &&
          record.s3.object.size <= 2 * 1024 * 1024
        ) {
          await pwaTable.addScreenshot(key, uploadMetadata.pwaID, uploadMetadata.devToken)
          console.log(`new screenshot for pwa ${uploadMetadata.pwaID} : ${key}`)
          console.log(`size is ${record.s3.object.size}`)
        } else {
          await deleteScreenshot(key)
        }
      } catch (err) {
        if (err.code === 'ConditionalCheckFailedException' || err.code === 'NoSuchKey') {
          const decodedKey = decodeURI(key).split('+').join(' ')
          await deleteScreenshot(decodedKey)
        } else {
          console.log(`error while updating screenshot : ${err.stack}`)
        }
      }
    }
  }
}
screenshotsBucket.onObjectCreated('onScreenshotUpload', onScreenshotUpload)
