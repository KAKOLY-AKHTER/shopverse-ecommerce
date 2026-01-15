# 🔐 Authentication Guide - ShopVerse

## 🚀 Quick Start

### 1. Mock Login (Ready to Use)
```
Email: admin@shopverse.com
Password: password123
```

### 2. Social Login (Demo Mode)
- **Google Login**: Click the Google button to see demo message
- **Facebook Login**: Click the Facebook button to see demo message

## 🔧 How It Works

### NextAuth.js Integration
আমরা NextAuth.js ব্যবহার করেছি যা industry standard authentication library:

```javascript
// Configuration in: src/app/api/auth/[...nextauth]/route.js
providers: [
  GoogleProvider({...}),
  FacebookProvider({...}),
  CredentialsProvider({...})
]
```

### Authentication Flow
1. **Login Page**: `/login` - সব authentication options
2. **Session Management**: JWT-based sessions
3. **Protected Routes**: Middleware automatically protects `/add-item`
4. **User Context**: Global state management with React Context

## 🌐 Real OAuth Setup (Production)

### Google OAuth Setup
1. **Google Cloud Console**: https://console.cloud.google.com/
2. **Create Project** অথবা existing project select করুন
3. **APIs & Services** > **Credentials**
4. **Create Credentials** > **OAuth 2.0 Client IDs**
5. **Authorized redirect URIs** এ add করুন:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
6. **Client ID** এবং **Client Secret** copy করুন
7. `.env.local` ফাইলে add করুন:
   ```
   GOOGLE_CLIENT_ID=your_actual_google_client_id
   GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
   ```

### Facebook OAuth Setup
1. **Facebook Developers**: https://developers.facebook.com/
2. **Create App** > **Consumer** type select করুন
3. **Facebook Login** product add করুন
4. **Settings** > **Basic** এ যান
5. **Valid OAuth Redirect URIs** এ add করুন:
   ```
   http://localhost:3000/api/auth/callback/facebook
   https://yourdomain.com/api/auth/callback/facebook
   ```
6. **App ID** এবং **App Secret** copy করুন
7. `.env.local` ফাইলে add করুন:
   ```
   FACEBOOK_CLIENT_ID=your_actual_facebook_app_id
   FACEBOOK_CLIENT_SECRET=your_actual_facebook_app_secret
   ```

## 🔒 Security Features

### 1. JWT Sessions
- Secure token-based authentication
- Automatic token refresh
- Server-side session validation

### 2. Middleware Protection
```javascript
// middleware.js
export default withAuth(
  function middleware(req) {
    // Protected route logic
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith('/add-item')) {
          return !!token; // Require authentication
        }
        return true;
      },
    },
  }
);
```

### 3. CSRF Protection
- NextAuth.js automatically handles CSRF tokens
- Secure cookie settings
- Same-site cookie policy

## 🎯 Testing Guide

### 1. Mock Login Test
```bash
# Start the application
npm run dev

# Navigate to http://localhost:3000/login
# Use: admin@shopverse.com / password123
```

### 2. Social Login Test (Demo)
```bash
# Click Google/Facebook buttons
# See demo messages in toast notifications
# Real OAuth requires actual credentials
```

### 3. Protected Route Test
```bash
# Try accessing /add-item without login
# Should redirect to /login
# After login, should access successfully
```

## 🛠 Customization

### Adding New Providers
```javascript
// In route.js, add new provider:
import GitHubProvider from 'next-auth/providers/github';

providers: [
  // ... existing providers
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }),
]
```

### Custom Login Page
```javascript
// Modify src/app/login/page.jsx
const handleSocialLogin = async (provider) => {
  await signIn(provider, { callbackUrl: '/dashboard' });
};
```

## 📱 Mobile Considerations

### Responsive Design
- Touch-friendly buttons
- Mobile-optimized OAuth flows
- Progressive Web App ready

### Deep Linking
- Automatic redirect after OAuth
- Preserve intended destination
- Handle app-to-app transitions

## 🚀 Production Deployment

### Environment Variables
```bash
# Required for production
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-super-secret-production-key

# OAuth Credentials
GOOGLE_CLIENT_ID=prod_google_client_id
GOOGLE_CLIENT_SECRET=prod_google_client_secret
FACEBOOK_CLIENT_ID=prod_facebook_app_id
FACEBOOK_CLIENT_SECRET=prod_facebook_app_secret
```

### Vercel Deployment
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

## 🔍 Troubleshooting

### Common Issues

1. **OAuth Redirect Mismatch**
   ```
   Error: redirect_uri_mismatch
   Solution: Check authorized redirect URIs in OAuth console
   ```

2. **Session Not Persisting**
   ```
   Issue: User gets logged out on refresh
   Solution: Check NEXTAUTH_SECRET and cookie settings
   ```

3. **Middleware Not Working**
   ```
   Issue: Protected routes accessible without login
   Solution: Verify middleware.js configuration
   ```

### Debug Mode
```javascript
// Add to route.js for debugging
export default NextAuth({
  debug: process.env.NODE_ENV === 'development',
  // ... other config
});
```

## 📚 Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Setup](https://developers.facebook.com/docs/facebook-login/)
- [JWT.io](https://jwt.io/) - JWT token decoder

---

**🎉 Ready to use! Mock login works immediately, social login needs real OAuth credentials for full functionality.**