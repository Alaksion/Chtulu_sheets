import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '../../../services/CreateUserService';
import UpdateUserService from '../../../services/UpdateUserService';

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, email, password } = req.body;
    const CreateUser = container.resolve(CreateUserService);
    const newUser = await CreateUser.execute({ username, email, password });
    return res.json(classToClass(newUser));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { email, username } = req.body;
    const userId = req.user.id;
    const updateUser = container.resolve(UpdateUserService);
    const updatedUser = await updateUser.execute({ email, username, userId });
    return res.json(classToClass(updatedUser));
  }
}

export default UserController;
