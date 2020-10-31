import AuthenticateUserService from '@modules/user/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class LoginController {
  public async Login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticateService = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateService.execute({
      email,
      password,
    });
    return res.json({ user, token });
  }
}

export default LoginController;
