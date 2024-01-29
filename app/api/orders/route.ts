import { NextApiRequest, NextApiResponse } from 'next';
import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { NextResponse } from 'next/server';
import { isAdminRequest } from '../auth/[...nextauth]/route';

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

export async function GET(req: Request, res: Response) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  try {
    const orders: IOrderDocument[] = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
