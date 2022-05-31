import { User } from '../auth/models/user';
import { GroupOrder } from './group-order';

export interface OrderItem {
  _id: string;
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  user: User | string;
  order: GroupOrder;
  itemUrl: string;
  itemName: string;
  imgSrc: string;
  itemPrice: number;
  itemQuantity: number;
  itemShop: 'ilsemaforo' | 'taiwangun';
  isUnavailable: boolean;
  itemStatus:
    | 'pending-confirmation'
    | 'pending-payment'
    | 'cancelled'
    | 'confirmed';
  // Se ci sono riferimenti ad ID di altri documenti, usa `Types.ObjectId`
}
