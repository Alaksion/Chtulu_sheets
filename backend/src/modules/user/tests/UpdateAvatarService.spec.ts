import 'reflect-metadata';
import FakeStorageProvider from '@shared/container/Providers/StorageProvider/Fakes/FakeStorageProvider';
import AppError from '@shared/Errors/AppError';
import UpdateAvatarService from '../services/UpdateAvatarService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateAvatarService: UpdateAvatarService;

describe('Testes de avatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateAvatarService = new UpdateAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });
  it('Deve ser possível inserir o avatar em um usuário', async () => {
    const novoUsuario = await fakeUserRepository.create({
      email: 'email-teste',
      username: 'teste',
      password: 'teste',
    });
    const arquivoEsperado = 'ArquivoReal';

    const usuarioAtualizado = await updateAvatarService.execute({
      userId: novoUsuario.id,
      filename: arquivoEsperado,
    });

    expect(usuarioAtualizado.userAvatar).toBe(arquivoEsperado);
  });

  it('Não deve ser possível alterar o avatar de um usuario que nao existe', async () => {
    const userId = 'NaoExiste';
    const arquivoEsperado = 'ArquivoEsperado';
    await expect(
      updateAvatarService.execute({
        userId,
        filename: arquivoEsperado,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve ser possível alterar o avatar de um usuario', async () => {
    const primeiroAvatar = 'PrimeiroAvatar';
    const segundoAvatar = 'SegundoAvatar';
    const novoUsuario = await fakeUserRepository.create({
      email: 'email-teste',
      username: 'teste',
      password: 'teste',
    });

    const deleteFileFunction = jest.spyOn(fakeStorageProvider, 'deleteFile');

    await updateAvatarService.execute({
      userId: novoUsuario.id,
      filename: primeiroAvatar,
    });
    await updateAvatarService.execute({
      userId: novoUsuario.id,
      filename: segundoAvatar,
    });

    expect(deleteFileFunction).toHaveBeenCalledWith('PrimeiroAvatar');
  });
});
