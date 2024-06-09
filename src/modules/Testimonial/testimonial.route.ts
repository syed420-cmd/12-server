import { Router } from 'express';
import { TestimonialControllers } from './testimonial.controller';

const router = Router();

router.get('/', TestimonialControllers?.getTestimonials);
router.post('/create-testimonial', TestimonialControllers?.createTestimonial);

export const TestimonialRoutes = router;
