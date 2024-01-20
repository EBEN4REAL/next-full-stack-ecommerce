import { authOptions } from "@/utils/authoptions";
import NextAuth,{ getServerSession }  from "next-auth/next";
import { NextResponse } from "next/server";

const handler = NextAuth(authOptions);

const adminEmails = ["igbinobaebenezer@gmail.com"]

export async function isAdminRequest(req: Request, res: Response) {
    const session = await getServerSession(authOptions);
    
    if (!adminEmails.includes(session?.user?.email as string)) {
        return NextResponse.json({status: 401, error: "Not an Admin!"})
    }
}

export { handler as GET, handler as POST };