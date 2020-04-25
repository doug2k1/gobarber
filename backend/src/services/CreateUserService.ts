import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import User from '../models/User'
import AppError from '../errors/AppError'

interface Request {
  name: string
  email: string
  password: string
}

export default class CreateUserService {
  static async run({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const userWithSameEmail = await usersRepository.findOne({
      where: { email },
    })

    if (userWithSameEmail) {
      throw new AppError('The email is already registered')
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await usersRepository.save(user)

    return user
  }
}
