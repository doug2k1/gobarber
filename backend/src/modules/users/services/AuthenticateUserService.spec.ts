import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import { IUsersRepository } from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

let fakeUsersRepository: IUsersRepository
let fakeHashProvider: IHashProvider
let authenticateUser: AuthenticateUserService
let createUser: CreateUserService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should authenticate an user with valid credentials', async () => {
    const data = {
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    }
    await createUser.run(data)

    const sessionData = await authenticateUser.run({
      email: data.email,
      password: data.password,
    })

    expect(sessionData.user.email).toBe(data.email)
    expect(sessionData.token).toBeDefined()
  })

  it('should fail authentication when email is not found', async () => {
    await expect(
      authenticateUser.run({
        email: 'nouser@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should fail authentication when password is incorrect', async () => {
    const data = {
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    }
    await createUser.run(data)

    await expect(
      authenticateUser.run({
        email: 'john@example.com',
        password: '123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
