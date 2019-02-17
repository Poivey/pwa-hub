import { s3 } from '@pulumi/aws'
import { getObjectTags, deleteObject } from './util'

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
