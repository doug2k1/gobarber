import UserToken from '../infra/typeorm/entities/UserToken'

export interface IUsersTokensRepository {
  findByUserId(userId: string): Promise<UserToken | undefined>
  findByToken(token: string): Promise<UserToken | undefined>
  create(userId: string): Promise<UserToken>
}
