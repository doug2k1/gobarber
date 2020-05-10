/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import IMailProvider from '../models/IMailProvider'

export default class FakeMailProvider implements IMailProvider {
  public async sendMail(to: string, body: string): Promise<void> {}
}
