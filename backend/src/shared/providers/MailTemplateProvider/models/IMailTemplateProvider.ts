import IMailTemplateParseDTO from '../dtos/IMailTemplateParseDTO'

export default interface IMailTemplateProvider {
  parse(data: IMailTemplateParseDTO): Promise<string>
}
