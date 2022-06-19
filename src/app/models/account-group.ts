import { User } from '../auth/models/user';

export interface AccountGroup {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  accounts: User[];
  isActive: boolean;
}
