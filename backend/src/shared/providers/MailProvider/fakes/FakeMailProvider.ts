/* eslint-disable @typescript-eslint/no-empty-function */
import IMailProvider from '../models/IMailProvider'

export default class FakeMailProvider implements IMailProvider {
  public async sendMail(): Promise<void> {}
}
