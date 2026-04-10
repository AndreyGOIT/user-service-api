import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { userController } from '../controllers/user.controller';


const router = Router();

router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'You are authorized' });
});
router.get('/:id', authMiddleware, userController.getById);
router.get('/', authMiddleware, userController.getAll);
router.patch('/:id/block', authMiddleware, userController.block);


export default router;