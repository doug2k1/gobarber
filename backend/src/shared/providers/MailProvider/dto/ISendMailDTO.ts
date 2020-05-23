import IMailTemplateParseDTO from '@shared/providers/MailTemplateProvider/dtos/IMailTemplateParseDTO'

interface IMailContact {
  name: string
  email: string
}

export default interface ISendMailDTO {
  to: IMailContact
  from?: IMailContact
  subject: string
  templateData: IMailTemplateParseDTO
}
