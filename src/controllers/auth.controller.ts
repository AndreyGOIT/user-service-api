import { Request, Response } from 'express';
import { registerSchema } from '../utils/validators';
import { userService } from '../services/user.service';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const validatedData = registerSchema.parse(req.body);

      const user = await userService.register(validatedData);

      return res.status(201).json({
        id: user.id,
        email: user.email
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
};