import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { userService } from "../services/user.service";

export const userController = {
  async getById(req: AuthRequest, res: Response) {
    try {
      const userId = req.params.id as string;

        const user = await userService.getById(req.user, userId);
        
        if (!user) throw new Error('User not found');

      const { password, ...safeUser } = user;
      return res.json(safeUser);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  },

  async getAll(req: AuthRequest, res: Response) {
    try {
      const users = await userService.getAll(req.user);

      const safeUsers = users.map(({ password, ...rest }) => rest);

      return res.json(safeUsers);
    } catch (error: any) {
      return res.status(403).json({ message: error.message });
    }
  },

  async block(req: AuthRequest, res: Response) {
    try {
      const userId = req.params.id as string;

        const user = await userService.blockUser(req.user, userId);
        
        if (!user) throw new Error('User not found');

      const { password, ...safeUser } = user;
      return res.json(safeUser);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  },
};
