export interface user {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface blog {
  id: number;
  blog: {
    id: number;
    title: string;
    description: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
  };
}
