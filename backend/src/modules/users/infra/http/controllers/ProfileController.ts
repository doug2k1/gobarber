import { Request, Response } from 'express'
import { container } from 'tsyringe'
import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService from '@modules/users/services/ShowProfileService'

export default class ProfileController {
  public static async show(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.user

    const showProfile = container.resolve(ShowProfileService)

    const user = await showProfile.run({ id })

    delete user.password

    return response.json(user)
  }

  public static async update(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.user
    const { name, email, currentPassword, newPassword } = request.body

    const updateProfile = container.resolve(UpdateProfileService)
    const user = await updateProfile.run({
      id,
      name,
      email,
      currentPassword,
      newPassword,
    })

    delete user.password

    return response.json(user)
  }
}
