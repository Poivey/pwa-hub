import { s3, sdk } from '@pulumi/aws'
import { Tag } from 'aws-sdk/clients/s3'

const getSdk = () => new sdk.S3()

export const deleteObject = async (bucket: string, key: string) => {
  await getSdk()
    .deleteObject({
      Bucket: bucket,
      Key: key,
    })
    .promise()
}

const getObjectTags = async (bucket: string, key: string): Promise<Tag[]> => {
  const result = await getSdk()
    .getObjectTagging({
      Bucket: bucket,
      Key: key,
    })
    .promise()
  if (result.$response.error) {
    console.log(`failed retrieve tags for key : '${key}', in bucket : '${bucket}'`)
    return []
  } else {
    return result.TagSet
  }
}

export const getPwaTags = async (key: string, bucket: s3.Bucket): Promise<PwaTags> => {
  const tags: PwaTags = {}
  const fullTags = await getObjectTags(bucket.bucket.get(), key)
  fullTags.forEach(tag => {
    if (tag.Key.toLowerCase() === 'pwaid') {
      tags.pwaId = tag.Value
    }
    if (tag.Key.toLowerCase() === 'devtoken') {
      tags.devToken = tag.Value
    }
  })
  return tags
}

export const getUserTags = async (key: string, bucket: s3.Bucket): Promise<UserTags> => {
  const tags: UserTags = {}
  const fullTags = await getObjectTags(bucket.bucket.get(), key)
  fullTags.forEach(tag => {
    if (tag.Key.toLowerCase() === 'userid') {
      tags.userId = tag.Value
    }
    if (tag.Key.toLowerCase() === 'email') {
      tags.email = tag.Value
    }
  })
  return tags
}

export interface PwaTags {
  devToken?: string
  pwaId?: string
}

export interface UserTags {
  userId?: string
  email?: string
}
