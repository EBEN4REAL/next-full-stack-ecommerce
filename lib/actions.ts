'use server'

import { getSession } from "next-auth/react"
import { mongooseConnect } from "./mongoose";
import { Admin } from "@/models/Admin";


async function isAdminEmail(email: string | undefined | null): Promise<boolean> {
    mongooseConnect();
    const admin = await Admin.findOne({ email });
    return !!admin;
  }
 
export async function serverAction() {
  const session = await getSession()
  const isAdmin = await isAdminEmail(session?.user?.email);
 
  if (!isAdmin) {
    throw new Error('Unauthorized access: User does not have admin privileges.')
  }
}