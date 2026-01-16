import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is authenticated for protected routes
        if (req.nextUrl.pathname.startsWith('/add-item') || 
            req.nextUrl.pathname.startsWith('/manage-products')) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/add-item/:path*', '/manage-products/:path*']
};