import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import User from '../infra/typeorm/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  id: string
  name: string
  email: string
  currentPassword?: string
  newPassword?: string
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async run({
    id,
    name,
    email,
    currentPassword,
    newPassword,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not authenticated', 401)
    }

    const existingEmailUser = await this.usersRepository.findByEmail(email)

    if (existingEmailUser && existingEmailUser.id !== id) {
      throw new AppError('Email already in use', 400)
    }

    if (newPassword && !currentPassword) {
      throw new AppError('Current password must be informed', 400)
    }

    if (currentPassword && newPassword) {
      const matchedPassword = await this.hashProvider.compare(
        currentPassword,
        user.password
      )

      if (!matchedPassword) {
        throw new AppError('Incorrect password', 400)
      }

      user.password = await this.hashProvider.generate(newPassword)
    }

    user.name = name
    user.email = email

    const updatedUser = await this.usersRepository.save(user)

    return updatedUser
  }
}
