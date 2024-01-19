import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_CLIENT_SECRET as string,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise)
};
