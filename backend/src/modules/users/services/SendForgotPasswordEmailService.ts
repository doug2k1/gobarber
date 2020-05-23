import { inject, injectable } from 'tsyringe'
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider'
import path from 'path'
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

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  public async run({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) return

    const { token } = await this.usersTokensRepository.create(user.id)

    await this.mailProvider.sendMail({
      to: { name: user.name, email: user.email },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: path.resolve(__dirname, '../views/forgotPassword.hbs'),
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset-password?token=${token}`,
        },
      },
    })
  }
}
