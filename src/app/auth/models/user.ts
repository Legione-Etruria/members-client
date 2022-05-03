export interface User {
  _id: string;
  __v: number;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'tecnico';
  active: boolean;
  token?: string;
  signedUpAt: Date;
}
