import 'reflect-metadata';
import AuthenticateUserService from '@modules/user/services/AuthenticateUserService';
import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/user/providers/PasswordHashProvider/fakes/FakePasswordHashProvider';
import UnauthorizedError from '@shared/Errors/UnauthorizedError';

let authenticateUserService: AuthenticateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

describe('Testes de autenticação', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    authenticateUserService = new AuthenticateUserService(
      fakeHashProvider,
      fakeUserRepository,
    );
  });

  it('Deve ser Possível autenticar com usuario existente', async () => {
    const user = await fakeUserRepository.create({
      email: 'teste@teste.com.br',
      username: 'teste',
      password: '1234567890',
    });
    const authRes = await authenticateUserService.execute({
      email: user.email,
      password: user.password,
    });

    expect(authRes).toHaveProperty('token');
    expect(authRes).toHaveProperty('user');
  });

  it('Nao deve autenticar usuario inexistente', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'emailquenaoexiste@nexiste.com.br',
        password: 'senhaErrada',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('Nao Deve autenticar usuario com o email certo porem senha errada', async () => {
    const user = await fakeUserRepository.create({
      email: 'teste@teste.com.br',
      username: 'teste',
      password: '1234567890',
    });

    await expect(
      authenticateUserService.execute({
        email: user.email,
        password: 'senhaErrada',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
