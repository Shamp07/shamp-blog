import { NextApiRequest, NextApiResponse } from 'next';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import nextConnect from 'next-connect';

import * as T from '@types';
import authMiddleware from '@middleware/auth';

aws.config.loadFromPath('config/aws-config.json');

const upload = multer({
  storage: multerS3({
    s3: new aws.S3(),
    bucket: 'temporary',
    key(req, file, cb) {
      cb(null, `images/${Date.now().toString()}${path.extname(file.originalname)}`);
    },
  }),
});

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
})
  .post(upload.single('image'), (req, res) => {
    res.json({
      success: true,
      result: req.file?.path,
    });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default authMiddleware(handler, T.Auth.ADMIN);
