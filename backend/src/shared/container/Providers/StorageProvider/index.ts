import { container } from 'tsyringe';
import UploadConfig from '@config/UploadConfig';
import IStorageProvider from './models/IStorageProvider';
import LocalDiskProvider from './Implementations/LocalDiskProvider';

const providers = {
  localDisk: LocalDiskProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[UploadConfig.driver],
);
