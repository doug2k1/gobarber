import { Router } from 'express'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository'

const appointmentsRouter = Router()
appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = new AppointmentsRepository()
  const appointments = await appointmentsRepository.findAll()

  return res.json(appointments)
})

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body
  const parsedDate = new Date(date)

  const appointmentsRepository = new AppointmentsRepository()
  const createAppointment = new CreateAppointmentService(appointmentsRepository)
  const appointment = await createAppointment.run({
    provider_id,
    date: parsedDate,
  })

  return res.json(appointment)
})

export default appointmentsRouter
