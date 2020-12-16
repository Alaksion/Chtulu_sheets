import NotFoundError from '@shared/Errors/NotFoundError';
import RegraDeNegocioError from '@shared/Errors/RegraDeNegocioError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IPasswordHashProvider from '../providers/PasswordHashProvider/models/IPasswordHashProvider';

interface Request {
  email: string;
  username: string;
  userId: string;
  oldPassword?: string;
  newPassword?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IPasswordHashProvider,
  ) {}

  public async execute({
    email,
    username,
    userId,
    oldPassword,
    newPassword,
  }: Request): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const verifyEmail = await this.userRepository.findByEmail(email);

    if (verifyEmail && verifyEmail.id !== userId) {
      throw new RegraDeNegocioError('E-mail já está em uso por outro usuário');
    }

    if (newPassword && !oldPassword) {
      throw new RegraDeNegocioError('Campo senha antiga é obrigatório');
    }

    if (oldPassword && newPassword) {
      const verifypassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!verifypassword) {
        throw new RegraDeNegocioError('Senha antiga incorreta');
      }

      user.password = await this.hashProvider.generateHash(newPassword);
    }

    user.username = username;
    user.email = email;
    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }
}

export default UpdateUserService;
