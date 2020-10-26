import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, email, password } = req.body;
    const CreateUser = container.resolve(CreateUserService);
    const newUser = await CreateUser.execute({ username, email, password });
    return res.json(newUser);
  }
}

export default UserController;
