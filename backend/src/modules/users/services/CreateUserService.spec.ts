import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

describe('CreateUser', () => {
  it('should create a new user', async () => {
    const createUser = new CreateUserService(
      new FakeUsersRepository(),
      new FakeHashProvider()
    )

    const data = {
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    }
    const user = await createUser.run(data)

    expect(user.id).toBeDefined()
    expect(user.name).toBe(data.name)
    expect(user.email).toBe(data.email)
  })

  it('should not create two users with the same e-mail', async () => {
    const createUser = new CreateUserService(
      new FakeUsersRepository(),
      new FakeHashProvider()
    )

    const email = 'jhon@example.com'
    await createUser.run({ name: 'John 1', email, password: '123456' })

    return expect(
      createUser.run({ name: 'John 2', email, password: 'abcdef' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
