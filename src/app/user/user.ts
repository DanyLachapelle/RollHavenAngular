export interface User {
  id: number;
  pseudo: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isLoggedIn: boolean;
}
