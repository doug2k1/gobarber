import IStorageProvider from '../models/IStorageProvider'

export default class FakeStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    return file
  }

  public async deleteFile(file: string): Promise<void> {}
}
