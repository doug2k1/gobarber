import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import IStorageProvider from '@shared/providers/StorageProviders/models/IStorageProvider'
import User from '../infra/typeorm/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'

interface IRequest {
  id: string
  filename: string
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async run({ id, filename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not authenticated', 401)
    }

    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar)
    }

    user.avatar = await this.storageProvider.saveFile(filename)
    await this.usersRepository.save(user)

    return user
  }
}
