import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is authenticated for protected routes
        const path = req.nextUrl.pathname;
        
        if (path.startsWith('/add-item') || path.startsWith('/manage-products')) {
          return !!token;
        }
        return true;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/add-item/:path*', '/manage-products/:path*']
};