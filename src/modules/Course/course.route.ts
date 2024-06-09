import { Router } from 'express';
import { CourseControllers } from './course.controller';

const router = Router();

router.get('/', CourseControllers?.getCourses);
router.get('/:courseId', CourseControllers?.getCourseDetails);

router.post('/create-course', CourseControllers?.createCourse);

export const CourseRoutes = router;
