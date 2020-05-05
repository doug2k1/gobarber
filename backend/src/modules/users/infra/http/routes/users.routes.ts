import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()
const upload = multer(uploadConfig)

// create
usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body

  const user = await CreateUserService.run({
    name,
    email,
    password,
  })

  delete user.password

  return res.json(user)
})

// change avatar
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const { id } = req.user
    const { filename } = req.file

    const user = await UpdateUserAvatarService.run({ id, filename })
    delete user.password

    return res.json(user)
  }
)

export default usersRouter
