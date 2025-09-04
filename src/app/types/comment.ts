export interface CreateComment {
  username: string;
  comment: string;
  watchlistId: Pointer;
  ownerId: Pointer;
  likes: string[];
}

interface Pointer {
  __type: 'Pointer';
  className: string;
  objectId: string;
}

export interface FullComment extends CreateComment {
  objectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentsResponse {
  results: FullComment[];
}

export interface likeCommentResWithId {
  likes: string[];
  updatedAt: string;
  objectId: string;
}
