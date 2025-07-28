export interface User {
  themes: string[];
  posts: string[];
  _id: string;
  email: string;
  username: string;
  password: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface UserForAuth {
  objectId: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  sessionToken: string;
  ACL: {
    "*": { read: boolean };
    [key: string]: { read?: boolean; write?: boolean };
  };
}