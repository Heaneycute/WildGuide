export type User = {
  id: number;
  username: string;
  email: string;
};

export type Entrie = {
  id: number;
  name: string;
  description: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Entries = Entrie[];
