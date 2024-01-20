import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  await mongooseConnect();
  const res = await req.json();
  const {title, description, price, images, properties, category } = res;
  const productDoc = await Product.create({
    title, description, price, images, properties, category
  })
  return NextResponse.json(productDoc);
}

export async function GET(req: Request) {
  await mongooseConnect();
  const {searchParams} = new URL(req.url);
  const _id = searchParams.get("id");
  if(_id) {
    return NextResponse.json(await Product.findOne({_id}).populate('categories'));
  } 
  return NextResponse.json(await Product.find());
 }

export async function PUT(req: Request) {
  await mongooseConnect();
  const {title, description, price, images, category, properties, _id} = await req.json();
  await Product.updateOne({_id}, {title, description, price, images, category, properties});
  return NextResponse.json(true);
}

export async function DELETE(req: Request, route: { query: { id: string }}) {
  await mongooseConnect();
  const res = await req.json()
  const {searchParams} = new URL(req.url);
  const _id = searchParams.get("id");
  if (_id) {
    await Product.deleteOne({_id});
    res.json(true);
  }
}

