import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository'
import AppointmentsController from '../controllers/AppointmentsController'

const appointmentsRouter = Router()
appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = new AppointmentsRepository()
  const appointments = await appointmentsRepository.findAll()

  return res.json(appointments)
})

appointmentsRouter.post('/', AppointmentsController.create)

export default appointmentsRouter
