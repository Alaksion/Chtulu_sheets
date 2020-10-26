import { hash, compare } from 'bcryptjs';
import IPasswordHashProvider from '../models/IPasswordHashProvider';

class BcryptHashProvider implements IPasswordHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BcryptHashProvider;
