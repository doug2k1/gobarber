import nodemailer, { Transporter } from 'nodemailer'
import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider'
import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dto/ISendMailDTO'

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        throw new AppError(`Failed to create a testing account. ${err.message}`)
      }

      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })
    })
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    try {
      const html = await this.mailTemplateProvider.parse(templateData)

      const mailInfo = await this.client.sendMail({
        from: from
          ? { name: from.name, address: from.email }
          : 'Equipe GoBarber <equipe@gobarber.com.br>',
        to: { name: to.name, address: to.email },
        subject,
        html,
      })

      console.log('Message sent: %s', mailInfo.messageId)
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailInfo))
    } catch (err) {
      throw new AppError(`Failed to send e-mail. ${err.message}`)
    }
  }
}
