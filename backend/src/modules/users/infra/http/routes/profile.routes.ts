import { Router } from 'express'
import ProfileController from '../controllers/ProfileController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const profileRouter = Router()

profileRouter.use(ensureAuthenticated)
profileRouter.get('/', ProfileController.show)
profileRouter.put('/', ProfileController.update)

export default profileRouter
