import { User } from '../auth/models/user';
import { GroupOrder } from './group-order';

export interface OrderItem {
  _id: string;

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
  paymentMethod: 'paypal' | 'field';
  isUnavailable: boolean;
  isCollected: boolean;
  itemStatus:
    | 'pending-confirmation'
    | 'pending-payment'
    | 'cancelled'
    | 'confirmed';
  isChecked: boolean;
  staticItem: string;
}
