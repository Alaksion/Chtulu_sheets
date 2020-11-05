import UploadConfig from '@config/UploadConfig';
import fs from 'fs';
import path from 'path';
import IStorageProvider from '../models/IStorageProvider';

class LocalDiskProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(UploadConfig.directory, file),
      path.resolve(UploadConfig.directory, file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filepath = path.resolve(UploadConfig.directory, file);
    try {
      fs.promises.stat(filepath);
      await fs.promises.unlink(filepath);
    } catch {
      return;
    }
  }
}

export default LocalDiskProvider;
