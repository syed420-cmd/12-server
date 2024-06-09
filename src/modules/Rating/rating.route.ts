import { Router } from 'express';

const router = Router();

router.get('/');
router.post('/create-rating');

export const RatingRoutes = router;
