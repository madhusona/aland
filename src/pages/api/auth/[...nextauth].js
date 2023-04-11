//secret
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
 providers: [
  GoogleProvider({
   clientId: process.env.GOOGLE_ID,
   clientSecret: process.env.GOOGLE_SECRET,
  }),
 ],
 callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      console.log(user.email)
      if (user.email=="madusudhanan_avf@auroville.org.in") {
        return true
      } else {
        // Return false to display a default error message
       // return false
        // Or you can return a URL to redirect to:
         return '/unauthorized'
      }
    }
  },
 session: {
  strategy: 'jwt',
 },
 secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);