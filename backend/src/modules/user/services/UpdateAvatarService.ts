import IStorageProvider from '@shared/container/Providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  userId: string;
  filename: string;
}

@injectable()
class CreateAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ userId, filename }: Request): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.userAvatar) {
      await this.storageProvider.deleteFile(user.userAvatar);
    }

    const savedFiled = await this.storageProvider.saveFile(filename);
    user.userAvatar = savedFiled;
    await this.userRepository.save(user);
    return user;
  }
}

export default CreateAvatarService;
