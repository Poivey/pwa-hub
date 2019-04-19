'use strict'

const pulumi = require('@pulumi/pulumi')
const aws = require('@pulumi/aws')
const mime = require('mime')

// Create a bucket and expose a website index document
let siteBucket = new aws.s3.Bucket('balloon', {
  website: {
    indexDocument: 'index.html',
    errorDocument: 'index.html',
  },
})

let siteDir = './frontend-application/dist' // directory for content files

function uploadDirectoryToS3(directoryPath, relativePath) {
  for (let item of require('fs').readdirSync(directoryPath, { withFileTypes: true })) {
    const itemPath = require('path').join(directoryPath, item.name)
    const relativeItemPath = require('path').join(relativePath, item.name)
    if (item.isDirectory()) {
      uploadDirectoryToS3(itemPath, relativeItemPath)
    } else {
      let object = new aws.s3.BucketObject(relativeItemPath, {
        bucket: siteBucket, // reference the s3.Bucket object
        source: new pulumi.asset.FileAsset(itemPath), // use FileAsset to point to a file
        contentType: mime.getType(itemPath) || undefined, // set the MIME type of the file
      })
    }
  }
}

uploadDirectoryToS3(siteDir, '')

// Create an S3 Bucket Policy to allow public read of all objects in bucket
function publicReadPolicyForBucket(bucketName) {
  return JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetObject'],
        Resource: [
          `arn:aws:s3:::${bucketName}/*`, // policy refers to bucket name explicitly
        ],
      },
    ],
  })
}

// Set the access policy for the bucket so all objects are readable
let bucketPolicy = new aws.s3.BucketPolicy('bucketPolicy', {
  bucket: siteBucket.bucket, // refer to the bucket created earlier
  policy: siteBucket.bucket.apply(publicReadPolicyForBucket), // use output property `siteBucket.bucket`
})

// Stack exports
exports.bucketName = siteBucket.bucket
exports.websiteUrl = siteBucket.websiteEndpoint
