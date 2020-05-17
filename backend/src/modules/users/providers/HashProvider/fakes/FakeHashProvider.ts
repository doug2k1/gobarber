import IHashProvider from '../models/IHashProvider'

export default class FakeHashProvider implements IHashProvider {
  public async generate(payload: string): Promise<string> {
    return `${payload}hash`
  }

  public async compare(payload: string, hashed: string): Promise<boolean> {
    return `${payload}hash` === hashed
  }
}
