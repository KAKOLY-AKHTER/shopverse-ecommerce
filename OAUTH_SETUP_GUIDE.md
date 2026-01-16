# OAuth Setup Guide - Facebook & Google Login

This guide will help you set up Facebook and Google OAuth authentication for ShopVerse.

## 📋 Prerequisites

- A Google account
- A Facebook account
- Your deployed Vercel URL or localhost for testing

---

## 🔵 Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `ShopVerse` (or any name)
4. Click "Create"

### Step 2: Enable Google+ API

1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" (for public apps)
3. Click "Create"
4. Fill in the required information:
   - **App name**: ShopVerse
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. Click "Save and Continue"
6. Skip "Scopes" (click "Save and Continue")
7. Add test users (optional for development)
8. Click "Save and Continue"

### Step 4: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"
4. Fill in:
   - **Name**: ShopVerse Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
     - `https://your-vercel-domain.vercel.app` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://your-vercel-domain.vercel.app/api/auth/callback/google` (for production)
5. Click "Create"
6. **Copy the Client ID and Client Secret** - you'll need these!

### Step 5: Add to Environment Variables

Add to your `.env.local` file:

```env
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

---

## 🔵 Facebook OAuth Setup

### Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Select "Consumer" as app type
4. Click "Next"
5. Fill in:
   - **App name**: ShopVerse
   - **App contact email**: Your email
6. Click "Create App"

### Step 2: Add Facebook Login Product

1. In your app dashboard, find "Facebook Login"
2. Click "Set Up"
3. Select "Web" platform
4. Enter your site URL:
   - For development: `http://localhost:3000`
   - For production: `https://your-vercel-domain.vercel.app`
5. Click "Save" and "Continue"

### Step 3: Configure Facebook Login Settings

1. In the left sidebar, go to "Facebook Login" → "Settings"
2. Add to "Valid OAuth Redirect URIs":
   - `http://localhost:3000/api/auth/callback/facebook` (for development)
   - `https://your-vercel-domain.vercel.app/api/auth/callback/facebook` (for production)
3. Click "Save Changes"

### Step 4: Get App Credentials

1. Go to "Settings" → "Basic" in the left sidebar
2. **Copy the App ID and App Secret** - you'll need these!
3. Note: You may need to click "Show" to see the App Secret

### Step 5: Make App Public (For Production)

1. Toggle the switch at the top from "In Development" to "Live"
2. You may need to complete additional verification steps

### Step 6: Add to Environment Variables

Add to your `.env.local` file:

```env
FACEBOOK_CLIENT_ID=your-facebook-app-id-here
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret-here
```

---

## 🔧 Update NextAuth Configuration

Your NextAuth configuration should already be set up, but here's the complete code:

**File: `src/app/api/auth/[...nextauth]/route.js`**

```javascript
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authentication
        if (credentials.email === 'admin@shopverse.com' && 
            credentials.password === 'password123') {
          return {
            id: '1',
            name: 'Admin User',
            email: 'admin@shopverse.com',
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
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
```

---

## 📝 Complete Environment Variables

Your `.env.local` file should contain:

```env
# NextAuth
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-app-id-here
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret-here
```

### Generate NEXTAUTH_SECRET

Run this command in your terminal:

```bash
openssl rand -base64 32
```

Or use this online: https://generate-secret.vercel.app/32

---

## 🚀 Vercel Deployment Setup

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add all the environment variables from your `.env.local`:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (use your Vercel domain)
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `FACEBOOK_CLIENT_ID`
   - `FACEBOOK_CLIENT_SECRET`
4. Click "Save"

### Step 2: Update OAuth Redirect URIs

After deploying to Vercel, update your OAuth settings:

**Google:**
- Add: `https://your-vercel-domain.vercel.app/api/auth/callback/google`

**Facebook:**
- Add: `https://your-vercel-domain.vercel.app/api/auth/callback/facebook`

### Step 3: Redeploy

After adding environment variables, redeploy your app:
- Vercel will automatically redeploy when you push to GitHub
- Or manually trigger a redeploy from Vercel dashboard

---

## ✅ Testing

### Local Testing (Development)

1. Make sure `.env.local` has all variables
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Go to `http://localhost:3000/login`
4. Try logging in with Google or Facebook

### Production Testing (Vercel)

1. Make sure all environment variables are added to Vercel
2. Make sure OAuth redirect URIs include your Vercel domain
3. Go to your deployed site
4. Try logging in with Google or Facebook

---

## 🐛 Troubleshooting

### Common Issues:

1. **"Redirect URI mismatch"**
   - Make sure your redirect URIs exactly match in OAuth settings
   - Include both `http://localhost:3000` and your Vercel domain

2. **"Invalid client"**
   - Check that Client ID and Secret are correct
   - Make sure environment variables are properly set

3. **"App not verified" (Google)**
   - This is normal for development
   - Click "Advanced" → "Go to ShopVerse (unsafe)" for testing
   - For production, submit for Google verification

4. **Facebook login not working**
   - Make sure app is in "Live" mode (not "Development")
   - Check that redirect URIs are correct
   - Verify App ID and Secret are correct

5. **Environment variables not working**
   - Restart your development server after adding `.env.local`
   - For Vercel, redeploy after adding environment variables

---

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 🔒 Security Best Practices

1. **Never commit `.env.local` to Git** - it's already in `.gitignore`
2. **Use different credentials for development and production**
3. **Rotate secrets regularly**
4. **Keep your OAuth apps updated**
5. **Monitor OAuth app usage in respective dashboards**

---

## 📞 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the official documentation links
3. Check browser console for error messages
4. Verify all environment variables are set correctly

---

**Last Updated**: January 2025
**Author**: Kakoly Akhter
**Project**: ShopVerse E-commerce Application
