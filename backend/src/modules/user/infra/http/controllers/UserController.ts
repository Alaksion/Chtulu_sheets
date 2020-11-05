import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '../../../services/CreateUserService';

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, email, password } = req.body;
    const CreateUser = container.resolve(CreateUserService);
    const newUser = await CreateUser.execute({ username, email, password });
    return res.json(classToClass(newUser));
  }
}

export default UserController;
