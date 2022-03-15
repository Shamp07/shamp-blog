import winston from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';

import awsConfig from '@config/aws-config.json';

winston.add(new WinstonCloudwatch({
  name: 'winston-cloudwatch-logger',
  logGroupName: 'testing',
  logStreamName: 'another',
  awsRegion: awsConfig.region,
  awsAccessKeyId: awsConfig.accessKeyId,
  awsSecretKey: awsConfig.secretAccessKey,
}));

export default winston;
