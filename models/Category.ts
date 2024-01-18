import mongoose, { Document, Model, Schema, Types, models } from 'mongoose';

interface ICategory {
  name: string;
  parent?: Types.ObjectId | null;
  properties: object[];
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  parent: { type: Types.ObjectId, ref: 'Category' },
  properties: [{ type: Object }],
});

interface ICategoryModel extends Model<ICategory, {}> {}

export const Category: ICategoryModel = (models?.Category as ICategoryModel) || mongoose.model<ICategory, ICategoryModel>('Category', CategorySchema);