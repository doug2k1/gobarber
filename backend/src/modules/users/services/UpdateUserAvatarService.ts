import path from 'path'
import fs from 'fs'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import { IUsersRepository } from '../repositories/IUserRepository'

interface IRequest {
  id: string
  filename: string
}

export default class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  private static async deleteCurrentAvatar(avatar: string): Promise<void> {
    if (avatar) {
      const userAvatarPath = path.join(uploadConfig.storagePath, avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarPath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarPath)
      }
    }
  }

  public async run({ id, filename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not authenticated', 401)
    }

    if (user.avatar) {
      UpdateUserAvatarService.deleteCurrentAvatar(user.avatar)
    }

    user.avatar = filename
    await this.usersRepository.save(user)

    return user
  }
}
