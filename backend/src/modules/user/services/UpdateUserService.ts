import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  email: string;
  username: string;
  userId: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ email, username, userId }: Request): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const verifyEmail = await this.userRepository.findByEmail(email);
    if (verifyEmail) {
      throw new AppError('E-mail já está em uso por outro usuário');
    }

    user.username = username;
    user.email = email;
    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }
}

export default UpdateUserService;
