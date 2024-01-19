import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/app/api/auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { truncate } from "fs";



export async function POST(req: Request) {
  await mongooseConnect();
  const res = await req.json();
  const {title,description,price,images,properties} = res;
  const productDoc = await Product.create({
    title, description, price, images,properties,
  })
  return NextResponse.json(productDoc);
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const {method} = req;
//   await mongooseConnect();
  // await isAdminRequest(req,res);

  // if (method === 'GET') {
  //   if (req.query?.id) {
  //     res.json(await Product.findOne({_id:req.query.id}));
  //   } else {
  //     res.json(await Product.find());
  //   }
  // }

  // if (method === 'POST') {
  //   const {title,description,price,images,category,properties} = req.body;
  //   const productDoc = await Product.create({
  //     title,description,price,images,category,properties,
  //   })
  //   return NextResponse.json(productDoc)
  // }

  // if (method === 'PUT') {
  //   const {title,description,price,images,category,properties,_id} = req.body;
  //   await Product.updateOne({_id}, {title,description,price,images,category,properties});
  //   res.json(true);
  // }

  // if (method === 'DELETE') {
  //   if (req.query?.id) {
  //     await Product.deleteOne({_id:req.query?.id});
  //     res.json(true);
  //   }
  // }
// }


