import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/app/api/auth/[...nextauth]/route";
import {Setting} from "@/models/Setting";
import { NextResponse } from "next/server";

export  async function PUT(req: Request, res: Response) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const {name, value} = await req.json();
  const settingDoc = await Setting.findOne({name});
  if (settingDoc) {
    settingDoc.value = value;
    await settingDoc.save();
    return NextResponse.json(settingDoc);
  } else {
    return NextResponse.json(await Setting.create({name,value}));
  }

}

export  async function GET(req: Request, res: Response) {
    await mongooseConnect();
    await isAdminRequest(req, res);
    
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    return NextResponse.json( await Setting.findOne({name}) );
  }