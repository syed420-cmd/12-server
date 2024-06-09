import { IRating } from './rating.interface';
import { Rating } from './rating.model';

const createRatingIntoDB = async (payload: IRating) => {
  const result = await Rating?.create(payload);
  return result;
};

export const RatingServices = {
  createRatingIntoDB,
};
