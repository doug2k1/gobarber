import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository'
import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import { uuid } from 'uuidv4'

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(
      (a) => a.date.getTime() === date.getTime()
    )

    return appointment
  }

  public async findAll(): Promise<Appointment[]> {
    return this.appointments
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()
    Object.assign(appointment, { id: uuid() }, data)

    this.appointments.push(appointment)

    return appointment
  }
}
