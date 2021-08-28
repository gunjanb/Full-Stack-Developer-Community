const AWS = require("aws-sdk");
let bucketName = process.env.BUCKET_NAME;
let bucketRegion = process.env.BUCKET_REGION;

// const awsConfig = {
//   // accessKeyId
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   // secretAccessKey
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: "us-east-2",
//   apiVersion: "2006-03-01",
//   correctClockSkew: true,
// };
// AWS.config.update(awsConfig);

// const S3 = new AWS.S3();
AWS.config.update({
  region: bucketRegion,
  correctClockSkew: true,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const S3 = new AWS.S3({
  apiVersion: "2006-03-01",
});

module.exports = {
  returnS3Instance() {
    // console.log('returning s3 instance from AWS', s3)
    return S3;
  },
};
