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
  id:string
  username: string;
  email: string;
  password: string;
  token:string;
}