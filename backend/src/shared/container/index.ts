import { container } from 'tsyringe'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import '@modules/users/providers'
import '../providers'
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository'
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository'

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
)
