import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import UpdateProfileService from './UpdateProfileService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

let fakeUsersRepository: IUsersRepository
let fakeHashProvider: IHashProvider
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })

    const updatedUser = await updateProfile.run({
      id: user.id,
      name: 'John 2',
      email: 'john2@example.com',
    })

    expect(updatedUser.name).toBe('John 2')
    expect(updatedUser.email).toBe('john2@example.com')
  })

  it('should update user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password: await fakeHashProvider.generate('123456'),
    })

    const updatedUser = await updateProfile.run({
      id: user.id,
      name: 'John',
      email: 'john@example.com',
      currentPassword: '123456',
      newPassword: '111222',
    })

    expect(
      fakeHashProvider.compare('111222', updatedUser.password)
    ).toBeTruthy()
  })

  it('should not update user password if current password is wrong', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password: await fakeHashProvider.generate('123456'),
    })

    await expect(
      updateProfile.run({
        id: user.id,
        name: 'John',
        email: 'john@example.com',
        currentPassword: '111111',
        newPassword: '111222',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should throw error if informed new password without current password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password: await fakeHashProvider.generate('123456'),
    })

    await expect(
      updateProfile.run({
        id: user.id,
        name: 'John',
        email: 'john@example.com',
        newPassword: '111222',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not update email to an existing one', async () => {
    await fakeUsersRepository.create({
      name: 'John 2',
      email: 'john2@example.com',
      password: '123456',
    })

    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })

    await expect(
      updateProfile.run({
        id: user.id,
        name: 'John 2',
        email: 'john2@example.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
