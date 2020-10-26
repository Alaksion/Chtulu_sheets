import CreateUserData from '@modules/user/dtos/ICreateUserData';
import User from '../infra/typeorm/entities/User';

export default interface IUserRepository {
  create(data: CreateUserData): Promise<User>;
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
