import { User } from '../auth/models/user';
import { OrderItem } from './order-item';
export interface GroupOrder {
  _id: string;
  id?: string;
  startDate: Date;
  dueDate: Date;
  shops: ('ilsemaforo' | 'taiwangun')[];
  issuedBy: User | string;
  items: OrderItem[];
  orderStatus: 'pending' | 'issued' | 'cancelled';
  orderNotes: string;
  orderPublicId: string;
  no_order: boolean;
  // Se ci sono riferimenti ad ID di altri documenti, usa `Types.ObjectId`
}
