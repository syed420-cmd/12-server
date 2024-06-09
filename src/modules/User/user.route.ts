import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.get('/', UserControllers?.getUsers);
router.post('/create-user', UserControllers?.createUser);
router.post('/create-token', UserControllers?.createJwtToken);
router.patch('/update-role/:userId', UserControllers?.updateUserRole);

export const UserRoutes = router;
