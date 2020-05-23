import FakeStorageProvider from '@shared/providers/StorageProviders/fakes/FakeStorageProvider'
import AppError from '@shared/errors/AppError'
import IStorageProvider from '@shared/providers/StorageProviders/models/IStorageProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'
import { IUsersRepository } from '../repositories/IUsersRepository'

let fakeUsersRepository: IUsersRepository
let fakeStorageProvider: IStorageProvider

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()
  })

  it('should update user avatar', async () => {
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

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('should delete existing avatar file', async () => {
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
      fakeUsersRepository,
      fakeStorageProvider
    )

    expect(
      updateUserAvatar.run({ id: '1', filename: 'avatar.jpg' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
