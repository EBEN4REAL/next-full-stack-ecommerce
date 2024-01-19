import mongoose, { Document, model, models, Schema } from 'mongoose';

interface ProductDocument extends Document {
  title: string;
  description?: string;
  price: number;
  images: string[];
  category: mongoose.Types.ObjectId | string; // Adjust type as needed
  properties?: Record<string, any>; // Adjust the type based on your requirements
}

const ProductSchema = new Schema<ProductDocument>({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Explicitly specify the type
  properties: { type: Object },
}, {
  timestamps: true,
});

export const Product = models.Product || model<ProductDocument>('Product', ProductSchema);