import { User } from '../auth/models/user';
import { GroupOrder } from './group-order';

export interface OrderItem {
  _id: string;
  id?: string;
  user: User | string;
  order: GroupOrder;
  itemUrl: string;
  itemName: string;
  imgSrc: string;
  itemPrice: number;
  itemQuantity: number;
  itemStatus:
    | 'pending-confirmation'
    | 'pending-payment'
    | 'cancelled'
    | 'confirmed';
  // Se ci sono riferimenti ad ID di altri documenti, usa `Types.ObjectId`
}