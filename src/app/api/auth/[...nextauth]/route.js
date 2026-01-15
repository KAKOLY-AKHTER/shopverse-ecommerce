import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-google-client-secret',
    }),
    
    // Facebook Provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || 'demo-facebook-client-id',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'demo-facebook-client-secret',
    }),
    
    // Credentials Provider (for mock login)
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Mock authentication logic
        const MOCK_EMAIL = 'admin@shopverse.com';
        const MOCK_PASSWORD = 'password123';
        
        if (credentials?.email === MOCK_EMAIL && credentials?.password === MOCK_PASSWORD) {
          return {
            id: '1',
            email: MOCK_EMAIL,
            name: 'Admin User',
            image: null,
          };
        }
        return null;
      }
    })
  ],
  
  pages: {
    signIn: '/login',
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      // Redirect to items page after successful login
      if (url.startsWith('/')) return `${baseUrl}/items`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/items`;
    }
  },
  
  session: {
    strategy: 'jwt',
  },
  
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
});

export { handler as GET, handler as POST };