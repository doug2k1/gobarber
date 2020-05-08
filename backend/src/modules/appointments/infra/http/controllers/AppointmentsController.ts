import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

export default class AppointmentsController {
  public static async create(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { provider_id, date } = request.body
    const parsedDate = new Date(date)

    const createAppointment = container.resolve(CreateAppointmentService)
    const appointment = await createAppointment.run({
      provider_id,
      date: parsedDate,
    })

    return response.json(appointment)
  }
}
