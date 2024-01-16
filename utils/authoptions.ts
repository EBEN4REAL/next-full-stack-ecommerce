

import {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXTAUTH_CLIENT_ID as string,
            clientSecret: process.env.NEXTAUTH_CLIENT_SECRET as string
        })
    ],
  };
