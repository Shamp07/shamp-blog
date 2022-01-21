import * as T from '@types';
import { NextApiRequest, NextApiResponse } from 'next';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

import cors from '@middleware/cors';
import authMiddleware from '@middleware/auth';

aws.config.loadFromPath('@config/aws-config.json');

const handler = async (request: T.NextApiRequestToken, response: NextApiResponse) => {
  await cors(request, response);

  if (request.method === T.RequestMethod.POST) {
    await createURL(request, response);
  }
};

const createURL = async (request: NextApiRequest, response: NextApiResponse) => {
  const s3 = new aws.S3();

  const upload = multer({
    storage: multerS3({
      s3,
      bucket: 'temporary',
      key(req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname));
      },
      acl: 'public-read-write',
    }),
  });

  upload.single('imgFile');

  response.json({
    success: true,
    result: {
      path: 'temporary',
    },
  });
};

export default authMiddleware(handler, T.Auth.ADMIN);
