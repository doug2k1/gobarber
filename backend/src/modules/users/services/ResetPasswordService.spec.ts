import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository'
import ResetPasswordService from './ResetPasswordService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

let fakeUsersRepository: FakeUsersRepository
let fakeUsersTokensRepository: FakeUsersTokensRepository
let fakeHashProvider: FakeHashProvider
let resetPassword: ResetPasswordService

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUsersTokensRepository = new FakeUsersTokensRepository()
    fakeHashProvider = new FakeHashProvider()
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeHashProvider
    )
  })

  it('should reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@email.com',
      password: '123',
    })

    const { token } = await fakeUsersTokensRepository.create(user.id)
    const generateHash = jest.spyOn(fakeHashProvider, 'generate')

    await resetPassword.run({ token, password: '456' })

    const updatedUser = await fakeUsersRepository.findById(user.id)
    const hashedPassword = await fakeHashProvider.generate('456')

    expect(generateHash).toHaveBeenLastCalledWith('456')
    expect(updatedUser?.password).toBe(hashedPassword)
  })

  it('should not reset the password with an invalid token', async () => {
    await expect(
      resetPassword.run({ token: 'invalid', password: '456' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should throw error when the user does not exists', async () => {
    const { token } = await fakeUsersTokensRepository.create('non-existent')

    await expect(
      resetPassword.run({ token, password: '456' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not reset the password with an expired token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@email.com',
      password: '123',
    })

    const { token } = await fakeUsersTokensRepository.create(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPassword.run({ token, password: '456' })
    ).rejects.toBeInstanceOf(AppError)

    const updatedUser = await fakeUsersRepository.findById(user.id)
    const hashedPassword = await fakeHashProvider.generate('456')

    expect(updatedUser?.password).not.toBe(hashedPassword)
  })
})
