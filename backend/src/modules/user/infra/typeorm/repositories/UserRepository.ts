import { Repository, getRepository } from 'typeorm';

import ICreateUserData from '../../../dtos/ICreateUserData';
import User from '../entities/User';
import IUserRepository from '../../../repositories/IUserRepository';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserData): Promise<User> {
    const user = this.ormRepository.create(data);
    const savedUser = await this.save(user);
    console.log(savedUser);
    return savedUser;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ where: { email } });
    return findUser;
  }
}

export default UserRepository;
