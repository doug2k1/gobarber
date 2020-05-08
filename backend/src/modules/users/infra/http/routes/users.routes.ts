import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

const usersRouter = Router()
const upload = multer(uploadConfig)

// create
usersRouter.post('/', UsersController.create)

// change avatar
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  UserAvatarController.update
)

export default usersRouter
