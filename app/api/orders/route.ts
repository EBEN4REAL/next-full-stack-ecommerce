import { NextApiRequest, NextApiResponse } from 'next';
import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';

interface IOrderDocument {
    line_items:Object,
    name:String,
    email:String,
    city:String,
    postalCode:String,
    streetAddress:String,
    country:String,
    paid:Boolean,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await mongooseConnect();

  try {
    const orders: IOrderDocument[] = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}