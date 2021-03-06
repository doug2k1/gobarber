import { startOfHour } from 'date-fns'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import Appointment from '../infra/typeorm/entities/Appointment'
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  date: Date
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async run({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)
    const appointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (appointmentInSameDate) {
      throw new AppError('This time is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })

    return appointment
  }
}
