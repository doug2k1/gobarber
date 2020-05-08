import { Request, Response } from 'express'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import { container } from 'tsyringe'

export default class UserAvatarController {
  public static async update(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.user
    const { filename } = request.file

    const updateUserAvatar = container.resolve(UpdateUserAvatarService)
    const user = await updateUserAvatar.run({ id, filename })
    delete user.password

    return response.json(user)
  }
}
