import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import AppError from '@shared/Errors/AppError';
import UpdateUserService from '../services/UpdateUserService';

describe('Testes de atualizar usuario', () => {
  let fakeUserRepository: FakeUserRepository;
  let updateUserService: UpdateUserService;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    updateUserService = new UpdateUserService(fakeUserRepository);
  });
  it('Deve ser possível alterar o nome de um usuario existente', async () => {
    const user = await fakeUserRepository.create({
      email: 'john@doe.com.br',
      username: 'John doe',
      password: '1234567890',
    });
    const newUsername = 'modiefied doe';
    const newEmail = 'modified@doe.com.br';

    const updatedUser = await updateUserService.execute({
      email: newEmail,
      username: newUsername,
      userId: user.id,
    });
    expect(updatedUser.username).toBe(newUsername);
  });

  it('Deve ser possível alterar o e-mail de um usuario existente', async () => {
    const user = await fakeUserRepository.create({
      email: 'john@doe.com.br',
      username: 'John doe',
      password: '1234567890',
    });
    const newUsername = 'modiefied doe';
    const newEmail = 'modified@doe.com.br';

    const updatedUser = await updateUserService.execute({
      email: newEmail,
      username: newUsername,
      userId: user.id,
    });
    expect(updatedUser.email).toBe(newEmail);
  });

  it('Não deve ser possível alterar dados de um usuário que não existe', async () => {
    const newUsername = 'modiefied doe';
    const newEmail = 'modified@doe.com.br';

    await expect(
      updateUserService.execute({
        email: newEmail,
        username: newUsername,
        userId: 'non-existingId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser possível alterar o e-mail para um email já utilizado', async () => {
    const user = await fakeUserRepository.create({
      email: 'john@doe.com.br',
      username: 'John doe',
      password: '1234567890',
    });
    const newUsername = 'modiefied doe';

    await expect(
      updateUserService.execute({
        email: user.email,
        username: newUsername,
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
