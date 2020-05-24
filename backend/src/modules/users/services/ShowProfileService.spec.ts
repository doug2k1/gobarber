import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'
import ShowProfileService from './ShowProfileService'

let fakeUsersRepository: IUsersRepository
let showProfile: ShowProfileService

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    showProfile = new ShowProfileService(fakeUsersRepository)
  })

  it('should return user info', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })

    const profile = await showProfile.run({
      id: user.id,
    })

    expect(profile.name).toBe('John')
    expect(profile.email).toBe('john@example.com')
  })

  it('should throw error for non existent user', async () => {
    await expect(
      showProfile.run({
        id: 'non-existent',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
