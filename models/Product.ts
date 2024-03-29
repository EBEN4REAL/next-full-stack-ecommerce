import mongoose, { Document, model, models, Schema } from 'mongoose';

interface ProductDocument extends Document {
  title?: string;
  description?: string;
  price?: string;
  images?: string[];
  category?: mongoose.Types.ObjectId | string; 
  properties?: Record<string, any>; 
}

const ProductSchema = new Schema<ProductDocument>({
  title: { type: String, required: false },
  description: String,
  price: { type: String, required: false },
  images: [{ type: String, required: false }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false }, 
  properties: { type: Object, required: false },
}, {
  timestamps: true,
});

export const Product = models.Product || model<ProductDocument>('Product', ProductSchema);

