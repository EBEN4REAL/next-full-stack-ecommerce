import mongoose, { Document, Model, models, Schema } from 'mongoose';

interface CategoryDocument extends Document {
  name: string;
  parent?: mongoose.Types.ObjectId | string | null;
  properties?: object[];
}

const CategorySchema = new Schema<CategoryDocument>({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  properties: [{ type: Object }],
});

export const Category: Model<CategoryDocument> = models.Category || mongoose.model('Category', CategorySchema);