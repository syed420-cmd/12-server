import { Router } from 'express';
import { ModuleControllers } from './module.controller';

const router = Router();

router.get('/');
router.post('/create-module', ModuleControllers?.createModule);

export const ModuleRoutes = router;
