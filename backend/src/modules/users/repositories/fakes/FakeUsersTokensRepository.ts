import UserToken from '@modules/users/infra/typeorm/entities/UserToken'
import { uuid } from 'uuidv4'
import { IUsersTokensRepository } from '../IUsersTokensRepository'

export default class FakeUsersTokensRepository
  implements IUsersTokensRepository {
  usersTokens: UserToken[] = []

  public async findByUserId(userId: string): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find((ut) => ut.user_id === userId)

    return userToken
  }

  public async create(userId: string): Promise<UserToken> {
    const userToken = new UserToken()
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id: userId,
    })
    this.usersTokens.push(userToken)

    return userToken
  }
}
