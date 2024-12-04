import { User } from './user.types';

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface AuthError {
  message: string;
  code?: number;
}