import { model, models, Schema, Document } from 'mongoose';

interface OrderItem {
  // Define your properties for line_items
}

interface OrderDocument extends Document {
  line_items: OrderItem;
  name: string;
  email: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  country: string;
  paid: boolean;
}

const OrderSchema = new Schema<OrderDocument>({
  line_items: Object as unknown as OrderItem, 
  name: String,
  email: String,
  city: String,
  postalCode: String,
  streetAddress: String,
  country: String,
  paid: Boolean,
}, {
  timestamps: true,
});

export const Order = models?.Order || model<OrderDocument>('Order', OrderSchema);