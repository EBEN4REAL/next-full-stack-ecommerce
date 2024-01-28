import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/app/api/auth/[...nextauth]/route";
import { Admin } from "@/models/Admin";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    await mongooseConnect();
    await isAdminRequest(req, res);

    const { email } = await req.json();
    if (await Admin.findOne({ email })) {
        return NextResponse.json({ status: 400, message: "A already exists!" });
    } else {
        return NextResponse.json(await Admin.create({ email }));
    }
}

export async function GET(req: Request, res: Response) {
    await mongooseConnect();
    await isAdminRequest(req, res);

    return NextResponse.json(await Admin.find());
}

export async function DELETE(req: Request, res: Response) {
    await mongooseConnect();
    await isAdminRequest(req, res);

    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");
    await Admin.findByIdAndDelete(_id);
    return NextResponse.json(true);
}