import LocalStoragePersistence from '@core/utils/LocalStoragePersistence';
import AWS from 'aws-sdk';

class AwsSdk {

  static getUploadS3Options(file, fileId) {
    return {
      bucketName: 'persons-image',
      params: {
        Key: fileId.toString() + '.jpg',
        ContentType: file.type,
        Body: file,
        ACL: 'public-read'
      }
    };
  }

  static getS3BucketInstance(config) {
    return new AWS.S3({
      params: {
        Bucket: config.bucketName
      }
    });
  }

  static uploadS3(file, fileId) {
    let config = AwsSdk.getUploadS3Options(file, fileId),
        bucket = this.getS3BucketInstance(config);
    
    AwsSdk.setUploadS3Credentials(bucket);
    return new Promise((resolve, reject) => {
      bucket.putObject(config.params, (err, data) => {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }

  static getUploadS3CredentialsOptions() {
    return {
      roleArn: 'arn:aws:iam::151436044518:role/ChooseTheForceS3UploadJavascript'
    }
  }

  static setUploadS3Credentials(bucket) {
    let config = this.getUploadS3CredentialsOptions(),
        fbLogin = LocalStoragePersistence.get('FBLogin');

    bucket.config.credentials = new AWS.WebIdentityCredentials({
      ProviderId: 'graph.facebook.com',
      RoleArn: config.roleArn,
      WebIdentityToken: fbLogin.authResponse.accessToken
    });
  }
}

export default AwsSdk;
