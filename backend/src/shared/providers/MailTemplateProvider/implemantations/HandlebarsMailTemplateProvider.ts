import handlebars from 'handlebars'
import fs from 'fs'
import IMailTemplateProvider from '../models/IMailTemplateProvider'
import IMailTemplateParseDTO from '../dtos/IMailTemplateParseDTO'

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  async parse({ file, variables }: IMailTemplateParseDTO): Promise<string> {
    const template = await fs.promises.readFile(file, 'utf-8')
    const parseTemplate = handlebars.compile(template)

    return parseTemplate(variables)
  }
}
