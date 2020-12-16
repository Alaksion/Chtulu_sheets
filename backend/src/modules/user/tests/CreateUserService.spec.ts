import 'reflect-metadata';
import RegraDeNegocioError from '@shared/Errors/RegraDeNegocioError';
import CreateUserSerivce from '../services/CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/PasswordHashProvider/fakes/FakePasswordHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakePasswordHashProvider: FakeHashProvider;
let createUserService: CreateUserSerivce;

describe('Testes de criar usuario', () => {
  beforeEach(() => {
    fakePasswordHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    createUserService = new CreateUserSerivce(
      fakeUserRepository,
      fakePasswordHashProvider,
    );
  });
  it('Deve ser possível criar novo usuário', async () => {
    const email = 'Teste@teste.com.br';
    const password = '1234567890';
    const username = 'test';

    const user = await createUserService.execute({ email, password, username });
    expect(user).toHaveProperty('id');
  });

  it('Não deve ser possível criar usuário com e-email repetido', async () => {
    const email = 'Teste@teste.com.br';
    const password = '1234567890';
    const username = 'test';
    await createUserService.execute({ email, password, username });
    await expect(
      createUserService.execute({ email, password, username }),
    ).rejects.toBeInstanceOf(RegraDeNegocioError);
  });
});
