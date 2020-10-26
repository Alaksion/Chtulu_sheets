import User from '@modules/user/infra/typeorm/entities/User';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import IPasswordHashProvider from '@modules/user/providers/PasswordHashProvider/models/IPasswordHashProvider';
import { inject, injectable } from 'tsyringe';

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
    const validateMail = this.userRepository.findByEmail(email);

    if (validateMail) {
      throw new Error('Email já está em uso');
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
