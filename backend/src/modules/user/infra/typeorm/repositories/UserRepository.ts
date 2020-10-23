import { Repository, getRepository, Not } from 'typeorm';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import User from '@modules/user/infra/typeorm/entities/User';
import ICreateUserData from '@modules/user/dtos/ICreateUserData';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserData): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.save(user);
    return user;
  }

  public async save(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }
}

export default UserRepository;
