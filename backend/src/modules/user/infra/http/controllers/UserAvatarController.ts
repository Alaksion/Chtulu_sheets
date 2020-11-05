import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateAvatarService from '@modules/user/services/UpdateAvatarService';
import { classToClass } from 'class-transformer';

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateService = container.resolve(UpdateAvatarService);
    const updatedUser = await updateService.execute({
      userId: req.user.id,
      filename: req.file.filename,
    });
    return res.json(classToClass(updatedUser));
  }
}

export default UserAvatarController;
