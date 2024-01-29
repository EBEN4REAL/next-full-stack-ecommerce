import { mongooseConnect } from "@/lib/mongoose";
import { Admin } from "@/models/Admin";
import { authOptions } from "@/utils/authoptions";
import NextAuth,{ getServerSession }  from "next-auth/next";
import { NextResponse } from "next/server";

const handler = NextAuth(authOptions);

async function isAdmin(email: string | undefined): Promise<boolean> {
    mongooseConnect();
    const admin = await Admin.findOne({ email });
    return !!admin;
  }

export async function isAdminRequest(req: Request, res: Response) {
    const session = await getServerSession(authOptions);
    const isAdminEmail = await isAdmin(session?.user?.email as string)
    
    if (isAdminEmail) {
        return NextResponse.json({status: 401, error: "Not an Admin!"})
    }
}

export { handler as GET, handler as POST };