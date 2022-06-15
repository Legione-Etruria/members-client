export interface parcelTrackerCheckpoint {
  lat?: number;
  long?: number;
  location?: string;
  time: Date;
  city?: string;
  country?: string;
  state?: string;
  zip?: string;
  message: string;
}

interface estDeliveryDate {
  estimated_delivery_date?: string;
  confidence_score?: null;
  estimated_delivery_date_min?: string;
  estimated_delivery_date_max?: string;
}

// 1. Crea un'interfaccia che rappresenti il documento in MongoDB
export interface ParcelTracker {
  _id: string;
  __v: number;
  parcelTitle?: string;
  trackingNumber: string;
  slug?: string;
  createdAt: Date;
  updatedAt: Date;
  checkpoints: parcelTrackerCheckpoint[];
  shipmentPickupDate?: string;
  shipmentDeliveryDate?: string;
  aftershipEstimatedDeliveryDate?: estDeliveryDate;
  courierTrackingUrl?: string;
  pickupLocation?: string;
  orderId: string;
  isDelivered?: boolean;

  // Se ci sono riferimenti ad ID di altri documenti, usa `Types.ObjectId`
}
