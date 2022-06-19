import { AccountGroup } from '../../models/account-group';
export interface User {
  _id: string;
  __v: number;
  token: string;
  email: string;
  password: string;
  role: 'athlete' | 'admin';
  firstName: string;
  lastName: string;
  battleName: string;
  figtMembership: string;
  legioMembershipDate: Date;
  legioMembershipExpirationDate: Date;
  legioMembershipSubscriptionCost: number;
  documentURL: string;
  active: boolean;
  signedUpAt: Date;
  birthDate: Date;
  accountGroup: AccountGroup;
}
