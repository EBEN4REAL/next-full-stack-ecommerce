import { NextAuthOptions, Session, DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { clientPromise } from '@/lib/mongodb';
import { mongooseConnect } from '@/lib/mongoose';
import { Admin } from '@/models/Admin';

async function isAdminEmail(email: string | undefined): Promise<boolean> {
  mongooseConnect();
  const admin = await Admin.findOne({ email });
  return !!admin;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }): Promise<Session | DefaultSession> => {
      if (session?.user?.email) {
        const isAdmin = await isAdminEmail(session.user.email);
        if (isAdmin) {
          return session as Session;
        }
      }
      return false as unknown as DefaultSession;
    },
  },
};