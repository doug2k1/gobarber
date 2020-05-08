import { hash } from 'bcryptjs'
import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import User from '../infra/typeorm/entities/User'
import { IUsersRepository } from '../repositories/IUserRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async run({ name, email, password }: IRequest): Promise<User> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new AppError('The email is already registered')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}
