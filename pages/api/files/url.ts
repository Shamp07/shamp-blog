import * as T from '@types';
import { NextApiRequest, NextApiResponse } from 'next';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

import cors from '@middleware/cors';
import authMiddleware from '@middleware/auth';

aws.config.loadFromPath('config/aws-config.json');

const upload = multer({
  storage: multerS3({
    s3: new aws.S3(),
    bucket: 'temporary',
    key(req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
    acl: 'public-read-write',
  }),
  dest: 'images/',
});

const handler = async (request: T.NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === T.RequestMethod.POST) {
    await createURL(request, response);
  }
};

const createURL = async (request: NextApiRequest, response: NextApiResponse) => {

  // const uploadMiddleware = upload.single('image');
  // uploadMiddleware(request, response (error) => {
  //   if (error) {
  //     console.error(error);
  //   }
  //
  //   response.json({
  //     success: true,
  //     result: request.file.path,
  //   });
  // });

};

export default authMiddleware(handler, T.Auth.ADMIN);
