import { authOptions } from "@/utils/authoptions";
import NextAuth,{ getServerSession }  from "next-auth/next";
import { NextApiRequest, NextApiResponse } from 'next';

const handler = NextAuth(authOptions);

const adminEmails = ["igbinobaebenezer@gmail.com"]



export async function isAdminRequest(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getServerSession(req, res, authOptions);
    
    if (!adminEmails.includes(session?.user?.email as string)) {
        res.status(401);
        res.end();
        throw 'not an admin';
    }
}
  

export { handler as GET, handler as POST };