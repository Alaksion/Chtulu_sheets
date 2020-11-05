import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tempFolder = path.resolve(__dirname, '..', 'temp', 'uploads');

interface IUploadConfig {
  driver: 'localDisk';
  multer: {
    storage: multer.StorageEngine;
  };
  config: {
    disk: {};
  };
  directory: string;
}

export default {
  driver: 'localDisk',
  directory: tempFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;
        return callback(null, filename);
      },
    }),
  },
} as IUploadConfig;
