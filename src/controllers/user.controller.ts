import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { userService } from '../services/user.service';

export const userController = {
  async getById(req: AuthRequest, res: Response) {
    try {
      const userId = req.params.id as string;

      const user = await userService.getById(req.user, userId);

      return res.json(user);
    } catch (error: any) {
      return res.status(403).json({ message: error.message });
    }
  },

  async getAll(req: AuthRequest, res: Response) {
    try {
      const users = await userService.getAll(req.user);

      return res.json(users);
    } catch (error: any) {
      return res.status(403).json({ message: error.message });
    }
  },

  async block(req: AuthRequest, res: Response) {
    try {
        const userId = req.params.id as string;
      
        const user = await userService.blockUser(req.user, userId);

      return res.json(user);
    } catch (error: any) {
      return res.status(403).json({ message: error.message });
    }
  }
};