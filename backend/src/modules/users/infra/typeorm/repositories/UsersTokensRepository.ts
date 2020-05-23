import UserToken from '@modules/users/infra/typeorm/entities/UserToken'
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository'
import { getRepository, Repository } from 'typeorm'

export default class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = getRepository(UserToken)
  }

  public async findByUserId(userId: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { user_id: userId },
    })

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    })

    return userToken
  }

  public async create(userId: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id: userId,
    })

    await this.ormRepository.save(userToken)

    return userToken
  }
}
