import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

describe('AuthenticateUser', () => {
  it('should authenticate an user with valid credentials', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

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
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    return expect(
      authenticateUser.run({
        email: 'nouser@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should fail authentication when password is incorrect', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const data = {
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    }
    await createUser.run(data)

    return expect(
      authenticateUser.run({
        email: 'john@example.com',
        password: '123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
