import { Comment } from './comment.model';
import { IComment } from './comment.interface';

const createCommentIntoDB = async (payload: IComment) => {
  const result = await Comment?.create(payload);
  return result;
};

export const CommentServices = {
  createCommentIntoDB,
};
