import { container } from 'tsyringe';
import BcryptHashProvider from './implementations/BcryptHashing';
import IPasswordHashProvider from './models/IPasswordHashProvider';

container.registerSingleton<IPasswordHashProvider>(
  'HashProvider',
  BcryptHashProvider,
);
