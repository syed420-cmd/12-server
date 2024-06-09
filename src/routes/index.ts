import { Router } from 'express';
import { CommentRoutes } from '../modules/Comments/comment.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { ModuleRoutes } from '../modules/Module/module.route';
import { NoteRoutes } from '../modules/Note/note.route';
import { RatingRoutes } from '../modules/Rating/rating.route';
import { SubModuleRoutes } from '../modules/SubModule/subModule.route';
import { TestimonialRoutes } from '../modules/Testimonial/testimonial.route';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const routes = [
  { path: '/comments', route: CommentRoutes },
  { path: '/courses', route: CourseRoutes },
  { path: '/modules', route: ModuleRoutes },
  { path: '/notes', route: NoteRoutes },
  { path: '/ratings', route: RatingRoutes },
  { path: '/sub-modules', route: SubModuleRoutes },
  { path: '/testimonials', route: TestimonialRoutes },
  { path: '/users', route: UserRoutes },
];

routes?.forEach((route) => router?.use(route?.path, route?.route));

export default router;
