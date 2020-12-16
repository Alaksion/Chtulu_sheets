import { sign } from 'jsonwebtoken';
import User from '@modules/user/infra/typeorm/entities/User';
import AuthConfig from '@config/AuthConfig';
import UnauthorizedError from '@shared/Errors/UnauthorizedError';
import IuserRepository from '@modules/user/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import IPasswordHashProvider from '../providers/PasswordHashProvider/models/IPasswordHashProvider';
import '@modules/user/providers/PasswordHashProvider/index';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IPasswordHashProvider,
    @inject('UserRepository')
    private UserRepository: IuserRepository,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const verifyEmail = await this.UserRepository.findByEmail(email);
    if (!verifyEmail) {
      throw new UnauthorizedError('Credenciais inválidas');
    }
    const verifypassword = await this.hashProvider.compareHash(
      password,
      verifyEmail.password,
    );

    if (!verifypassword) {
      throw new UnauthorizedError('Credenciais inválidas');
    }

    const token = sign({}, AuthConfig.secret, {
      subject: verifyEmail.id,
      expiresIn: AuthConfig.expiresAt,
    });

    return { user: verifyEmail, token };
  }
}

export default AuthenticateUserService;
