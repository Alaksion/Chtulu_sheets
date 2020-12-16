import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import FakePasswordHashProvider from '@modules/user/providers/PasswordHashProvider/fakes/FakePasswordHashProvider';
import NotFoundError from '@shared/Errors/NotFoundError';
import RegraDeNegocioError from '@shared/Errors/RegraDeNegocioError';
import UpdateUserService from '../services/UpdateUserService';

describe('Testes de atualizar usuario', () => {
  let fakeUserRepository: FakeUserRepository;
  let updateUserService: UpdateUserService;
  let fakePasswordHashProvider: FakePasswordHashProvider;

  beforeEach(() => {
    fakePasswordHashProvider = new FakePasswordHashProvider();
    fakeUserRepository = new FakeUserRepository();
    updateUserService = new UpdateUserService(
      fakeUserRepository,
      fakePasswordHashProvider,
    );
  });
  it('Deve ser possível alterar o nome de um usuario existente', async () => {
    const user = await fakeUserRepository.create({
      email: 'john@doe.com.br',
      username: 'John doe',
      password: '1234567890',
    });
    const newUsername = 'modiefied doe';

    const updatedUser = await updateUserService.execute({
      email: user.email,
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
    const newEmail = 'modified@doe.com.br';

    const updatedUser = await updateUserService.execute({
      email: newEmail,
      username: user.username,
      userId: user.id,
    });
    expect(updatedUser.email).toBe(newEmail);
  });

  it('Deve ser possível alterar o e-mail e usuario de um usuario existente', async () => {
    const user = await fakeUserRepository.create({
      email: 'john@doe.com.br',
      username: 'John doe',
      password: '1234567890',
    });
    const newEmail = 'modified@doe.com.br';
    const newUsername = 'modiefied doe';

    const updatedUser = await updateUserService.execute({
      email: newEmail,
      username: newUsername,
      userId: user.id,
    });
    expect(updatedUser.email).toBe(newEmail);
    expect(updatedUser.username).toBe(newUsername);
  });

  it('Deve ser possível alterar a senha de um usuario existente informando a senha antiga corretamente', async () => {
    const user = await fakeUserRepository.create({
      email: 'john@doe.com.br',
      username: 'John doe',
      password: '1234567890',
    });
    const newPassword = 'newPassword1234';

    const updatedUser = await updateUserService.execute({
      email: user.email,
      username: user.username,
      userId: user.id,
      newPassword,
      oldPassword: user.password,
    });
    expect(updatedUser.password).toBe(newPassword);
  });

  it('Deve ser possível alterar a senha, email e username de um usuario existente informando a senha antiga corretamente', async () => {
    const user = await fakeUserRepository.create({
      email: 'john@doe.com.br',
      username: 'John doe',
      password: '1234567890',
    });
    const newPassword = 'newPassword1234';
    const newEmail = 'modified@doe.com.br';
    const newUsername = 'modiefied doe';

    const updatedUser = await updateUserService.execute({
      email: newEmail,
      username: newUsername,
      userId: user.id,
      newPassword,
      oldPassword: user.password,
    });
    expect(updatedUser.password).toBe(newPassword);
    expect(updatedUser.email).toBe(newEmail);
    expect(updatedUser.username).toBe(newUsername);
  });

  it('Não Deve ser possível alterar a senha de um usuario existente informando a senha antiga incorretamente', async () => {
    const user = await fakeUserRepository.create({
      email: 'john@doe.com.br',
      username: 'John doe',
      password: '1234567890',
    });
    const newUsername = 'modiefied doe';
    const newEmail = 'modified@doe.com.br';
    const newPassword = 'newPassword1234';
    const wrongPassword = 'wrongPasssword';

    await expect(
      updateUserService.execute({
        email: newEmail,
        username: newUsername,
        userId: user.id,
        newPassword,
        oldPassword: wrongPassword,
      }),
    ).rejects.toBeInstanceOf(RegraDeNegocioError);
  });
  it('Não Deve ser possível alterar a senha de um usuario existente sem informar o campo senha antiga', async () => {
    const user = await fakeUserRepository.create({
      email: 'john@doe.com.br',
      username: 'John doe',
      password: '1234567890',
    });
    const newUsername = 'modiefied doe';
    const newEmail = 'modified@doe.com.br';
    const newPassword = 'newPassword1234';

    await expect(
      updateUserService.execute({
        email: newEmail,
        username: newUsername,
        userId: user.id,
        newPassword,
      }),
    ).rejects.toBeInstanceOf(RegraDeNegocioError);
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
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('Não deve ser possível alterar o e-mail para um email já utilizado por outro usuario', async () => {
    const usedEmail = 'firstJoenDoe@doe.com.br';
    await fakeUserRepository.create({
      email: usedEmail,
      username: 'John doe',
      password: '1234567890',
    });

    const user = await fakeUserRepository.create({
      email: 'secondJohnDoe@doe.com.br',
      username: 'John doe',
      password: '1234567890',
    });

    const newUsername = 'modiefied doe';

    await expect(
      updateUserService.execute({
        email: usedEmail,
        username: newUsername,
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(RegraDeNegocioError);
  });
});
