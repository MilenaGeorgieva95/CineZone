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
