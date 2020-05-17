import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import { addHours, isAfter } from 'date-fns'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  token: string
  password: string
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async run({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token)

    if (!userToken) throw new AppError('Invalid token')

    const tokenCreatedAt = userToken.created_at
    const expireDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), expireDate)) {
      throw new AppError('Expired token')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) throw new AppError('Invalid token')

    user.password = await this.hashProvider.generate(password)

    await this.usersRepository.save(user)
  }
}
