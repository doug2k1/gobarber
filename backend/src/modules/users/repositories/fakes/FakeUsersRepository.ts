/* eslint-disable class-methods-use-this */
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import User from '@modules/users/infra/typeorm/entities/User'
import { uuid } from 'uuidv4'
import { IUsersRepository } from '../IUsersRepository'

export default class FakeUsersRepository implements IUsersRepository {
  users: User[] = []

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((u) => u.id === id)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((u) => u.email === email)

    return user
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(
      user,
      {
        id: uuid(),
      },
      data
    )
    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<User> {
    return user
  }
}
