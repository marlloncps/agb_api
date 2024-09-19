import { Request, Response } from 'express';
import userService from './user.service';

class UserController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await userService.login(username, password);
    const {code, message} = user;
    return res.status(code).json({code: code, message: message})
  }

  async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await userService.register(username, password);
    return res.status(200).json(user);
  }
}

export default new UserController();
