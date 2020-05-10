import FakeStorageProvider from '@shared/providers/StorageProviders/fakes/FakeStorageProvider'
import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from './CreateUserService'
import UpdateUserAvatarService from './UpdateUserAvatarService'

describe('UpdateUserAvatar', () => {
  it('should update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository()

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      new FakeStorageProvider()
    )

    let user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })

    user = await updateUserAvatar.run({ id: user.id, filename: 'avatar.jpg' })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('should delete existing avatar file', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )

    let user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })

    user = await updateUserAvatar.run({ id: user.id, filename: 'avatar.jpg' })

    await updateUserAvatar.run({ id: user.id, filename: 'avatar2.jpg' })

    expect(deleteFile).toHaveBeenLastCalledWith('avatar.jpg')
  })

  it('should throw error if user is not found', () => {
    const updateUserAvatar = new UpdateUserAvatarService(
      new FakeUsersRepository(),
      new FakeStorageProvider()
    )

    expect(
      updateUserAvatar.run({ id: '1', filename: 'avatar.jpg' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
