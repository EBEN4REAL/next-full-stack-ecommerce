import {Category} from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from 'next';
import {getServerSession} from "next-auth";
import {isAdminRequest} from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  await mongooseConnect();
    const {name,parentCategory,properties} = await req.json();
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    
    return NextResponse.json(categoryDoc);
}

export async function GET(req: Request, res: Response) {
  await mongooseConnect();
  await isAdminRequest(req , res);
  const result = await Category.find().populate('parent')
  
  return NextResponse.json(result);
}

export async function PUT(req: Request) {
  await mongooseConnect();
  const {name,parent,properties,_id} = await req.json();
  const categoryDoc = await Category.updateOne({_id},{
    name,
    parent: parent || undefined,
    properties,
  });
 return NextResponse.json(categoryDoc);
}

export async function DELETE(req: Request) {
  await mongooseConnect();
  const {searchParams} = new URL(req.url);
  const _id = searchParams.get("id");
  await Category.deleteOne({_id});
  return NextResponse.json(true);
}
