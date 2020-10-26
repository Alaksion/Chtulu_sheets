import { container } from 'tsyringe';
import IPasswordHashProvider from '@modules/user/providers/PasswordHashProvider/models/IPasswordHashProvider';
import BcryptHashProvider from '@modules/user/providers/PasswordHashProvider/implementations/BcryptHashing';

container.registerSingleton<IPasswordHashProvider>(
  'HashProvider',
  BcryptHashProvider,
);
