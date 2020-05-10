import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository'

let fakeUsersRepository: FakeUsersRepository
let fakeMailProvider: FakeMailProvider
let fakeUsersTokensRepository: FakeUsersTokensRepository
let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUsersTokensRepository = new FakeUsersTokensRepository()
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokensRepository
    )
  })

  it('should send recover password e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.run({ email: 'john@example.com' })

    const sendMailLastCall = sendMail.mock.calls[sendMail.mock.calls.length - 1]
    expect(sendMail).toHaveBeenCalled()
    expect(sendMailLastCall[0]).toBe('john@example.com')
  })

  it('should generate a new recovery token', async () => {
    const createToken = jest.spyOn(fakeUsersTokensRepository, 'create')

    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.run({ email: 'john@example.com' })

    expect(createToken).toHaveBeenCalledWith(user.id)
  })

  it('should not send recover password e-mail for non-existent users', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    sendForgotPasswordEmail.run({ email: 'john@example.com' })

    expect(sendMail).not.toHaveBeenCalled()
  })
})
