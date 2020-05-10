import { sign } from 'jsonwebtoken'
import AppError from '@shared/errors/AppError'
import authConfig from '@config/auth'
import { injectable, inject } from 'tsyringe'
import User from '../infra/typeorm/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async run({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found or incorrect password', 401)
    }

    const passwordMatched = await this.hashProvider.compare(
      password,
      user.password
    )

    if (!passwordMatched) {
      throw new AppError('User not found or incorrect password', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
}
