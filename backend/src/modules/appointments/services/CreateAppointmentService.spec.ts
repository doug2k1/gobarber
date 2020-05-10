import AppError from '@shared/errors/AppError'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointment', () => {
  it('should create a new appointment', async () => {
    const createAppointment = new CreateAppointmentService(
      new FakeAppointmentsRepository()
    )

    const data = {
      provider_id: '1',
      date: new Date('2020-05-08T19:10:43.535Z'),
    }
    const appointment = await createAppointment.run(data)

    expect(appointment.id).toBeDefined()
    expect(appointment.provider_id).toBe(data.provider_id)
    expect(appointment.date.toISOString()).toBe('2020-05-08T19:00:00.000Z')
  })

  it('should not create two appointments at the same time', async () => {
    const createAppointment = new CreateAppointmentService(
      new FakeAppointmentsRepository()
    )

    const date = new Date('2020-05-08T19:10:43.535Z')
    await createAppointment.run({ provider_id: '1', date })

    return expect(
      createAppointment.run({ provider_id: '2', date })
    ).rejects.toBeInstanceOf(AppError)
  })
})
