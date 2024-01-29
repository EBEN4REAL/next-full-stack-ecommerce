import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authOptions } from './utils/authoptions';
import { mongooseConnect } from './lib/mongoose';
import { Admin } from './models/Admin';

async function isAdmin(email: string | undefined): Promise<boolean> {
  mongooseConnect();
  const admin = await Admin.findOne({ email });
  return !!admin;
}

export async function middleware(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      // Session or user email is not defined, return unauthorized
      return NextResponse.json({ status: 401, error: "Unauthorized" });
    }

    const isAdminEmail = await isAdmin(session.user.email);
    console.log("isAdminEmail", isAdminEmail
    )
    if (isAdminEmail) {
      // Not an admin, return unauthorized
      return NextResponse.json({ status: 401, error: "Not an Admin!" });
    }

    // Admin, continue with the request
    return NextResponse.next();
  } catch (error) {
    // Handle any errors
    console.error("Middleware error:", error);
    return NextResponse.error();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.\\.png$).)'],
};