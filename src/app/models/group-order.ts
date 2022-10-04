import { User } from '../auth/models/user';
import { OrderItem } from './order-item';
import { ParcelTracker } from './parcel-tracker';
import { StaticItem } from './static-item';
export interface GroupOrder {
  _id: string;

  startDate: Date;
  dueDate: Date;
  shops: ('ilsemaforo' | 'taiwangun')[];
  issuedBy: User | string;
  items: OrderItem[];
  orderStatus: 'pending' | 'issued' | 'cancelled';
  orderNotes: string;
  orderPublicId: string;
  no_order: boolean;
  orderTrackingNumbers: (ParcelTracker | string)[];
  staticItemsIds: string[];
  staticItems: StaticItem[];
  // Se ci sono riferimenti ad ID di altri documenti, usa `Types.ObjectId`
}
