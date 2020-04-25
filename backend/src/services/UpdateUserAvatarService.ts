import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import User from '../models/User'
import uploadConfig from '../config/upload'
import AppError from '../errors/AppError'

interface Request {
  id: string
  filename: string
}

export default class UpdateUserAvatarService {
  private static async deleteCurrentAvatar(avatar: string): Promise<void> {
    if (avatar) {
      const userAvatarPath = path.join(uploadConfig.storagePath, avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarPath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarPath)
      }
    }
  }

  public static async run({ id, filename }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(id)

    if (!user) {
      throw new AppError('User not authenticated', 401)
    }

    if (user.avatar) {
      this.deleteCurrentAvatar(user.avatar)
    }

    user.avatar = filename
    await usersRepository.save(user)

    return user
  }
}
