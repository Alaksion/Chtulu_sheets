import { v4 } from 'uuid';
import IUserRepository from '../IUserRepository';
import ICreateUserData from '../../dtos/ICreateUserData';
import User from '../../infra/typeorm/entities/User';

class FakeUserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async create(data: ICreateUserData): Promise<User> {
    const user = new User();
    user.email = data.email;
    user.password = data.password;
    user.username = data.username;
    user.id = v4();
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(u => u.id === user.id);
    this.users[userIndex] = user;
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser || undefined;
  }
}

export default FakeUserRepository;
