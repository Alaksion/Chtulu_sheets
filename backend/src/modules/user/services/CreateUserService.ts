import { inject, injectable } from 'tsyringe';
import AppError from '@shared/Errors/AppError';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import IPasswordHashProvider from '../providers/PasswordHashProvider/models/IPasswordHashProvider';
import User from '../infra/typeorm/entities/User';
import '../providers/PasswordHashProvider/index';

interface IRequest {
  username: string;
  password: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IPasswordHashProvider,
  ) {}

  public async execute({ username, password, email }: IRequest): Promise<User> {
    const validateMail = await this.userRepository.findByEmail(email);

    if (validateMail) {
      throw new AppError('Email já está em uso', 429);
    }
    const hashPassword = await this.hashProvider.generateHash(password);
    const newUser = await this.userRepository.create({
      username,
      password: hashPassword,
      email,
    });
    return newUser;
  }
}

export default CreateUserService;
