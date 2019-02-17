import { sdk } from '@pulumi/aws'
import { Tag } from 'aws-sdk/clients/s3'

const getSdk = () => new sdk.S3()

export const getObjectTags = async (bucket: string, key: string): Promise<Tag[]> => {
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

export const deleteObject = async (bucket: string, key: string) => {
  await getSdk()
    .deleteObject({
      Bucket: bucket,
      Key: key,
    })
    .promise()
}
