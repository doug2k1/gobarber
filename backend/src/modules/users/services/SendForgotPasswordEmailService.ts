import { inject, injectable } from 'tsyringe'
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository'

interface IRequest {
  email: string
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    private mailProvider: IMailProvider,

    private usersTokensRepository: IUsersTokensRepository
  ) {}

  public async run({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) return

    const token = this.usersTokensRepository.create(user.id)

    await this.mailProvider.sendMail(email, `Recuperação de senha: ${token}`)
  }
}
