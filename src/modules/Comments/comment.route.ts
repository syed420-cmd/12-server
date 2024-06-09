import { Router } from 'express';

const router = Router();

router.get('/');
router.post('/create-comment');

export const CommentRoutes = router;
