import { Router } from 'express';
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizePermission } from '../middleware/authMiddleware.js';
const userRouter = Router();

userRouter.get('/currentUser', getCurrentUser);
userRouter.get('/admin/app-stats', [
  authorizePermission('admin'),
  getApplicationStats,
]);
userRouter.patch('/update-user', validateUpdateUserInput, updateUser);

export default userRouter;
