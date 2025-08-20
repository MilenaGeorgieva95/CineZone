export interface CreateComment {
  title: string;
  comment: string;
  watchlistId: Pointer;
  ownerId: Pointer;
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
    results: FullComment[]
}