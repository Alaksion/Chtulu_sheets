import IPasswordHashProvider from '@modules/user/providers/PasswordHashProvider/models/IPasswordHashProvider';

class FakeHashProvider implements IPasswordHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeHashProvider;
