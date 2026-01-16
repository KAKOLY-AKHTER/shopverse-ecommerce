# Quick OAuth Setup - 5 Minutes Guide ⚡

## 🎯 What You Need

1. Google account
2. Facebook account
3. 10 minutes of your time

---

## 🔵 Google OAuth (3 minutes)

### Step 1: Create Project
1. Go to: https://console.cloud.google.com/
2. Click "New Project" → Name it "ShopVerse" → Create

### Step 2: Get Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If asked, configure consent screen:
   - Choose "External"
   - Fill app name: "ShopVerse"
   - Add your email
   - Save
4. Back to credentials:
   - Type: "Web application"
   - Name: "ShopVerse"
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/auth/callback/google
     https://your-vercel-url.vercel.app/api/auth/callback/google
     ```
5. Click "Create"
6. **COPY** Client ID and Client Secret

### Step 3: Add to .env.local
```env
GOOGLE_CLIENT_ID=paste-your-client-id-here
GOOGLE_CLIENT_SECRET=paste-your-client-secret-here
```

---

## 🔵 Facebook OAuth (3 minutes)

### Step 1: Create App
1. Go to: https://developers.facebook.com/
2. Click "Create App" → Choose "Consumer" → Next
3. App name: "ShopVerse" → Create

### Step 2: Setup Facebook Login
1. Find "Facebook Login" → Click "Set Up"
2. Choose "Web"
3. Site URL: `http://localhost:3000` → Save

### Step 3: Configure Settings
1. Left sidebar: "Facebook Login" → "Settings"
2. Valid OAuth Redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/facebook
   https://your-vercel-url.vercel.app/api/auth/callback/facebook
   ```
3. Save Changes

### Step 4: Get Credentials
1. Left sidebar: "Settings" → "Basic"
2. **COPY** App ID and App Secret (click Show)

### Step 5: Add to .env.local
```env
FACEBOOK_CLIENT_ID=paste-your-app-id-here
FACEBOOK_CLIENT_SECRET=paste-your-app-secret-here
```

---

## 🔐 Complete .env.local File

Create/update `.env.local` in your project root:

```env
# NextAuth Secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
```

---

## 🚀 Test It

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Go to login page:**
   ```
   http://localhost:3000/login
   ```

3. **Click Google or Facebook button**

4. **Login with your account**

5. **You should be redirected to items page!**

---

## 🌐 For Vercel Deployment

### Step 1: Add Environment Variables
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add all variables from `.env.local`
4. **Important:** Change `NEXTAUTH_URL` to your Vercel domain:
   ```
   NEXTAUTH_URL=https://your-project.vercel.app
   ```

### Step 2: Update OAuth Redirect URIs
1. **Google Console:**
   - Add: `https://your-project.vercel.app/api/auth/callback/google`

2. **Facebook Developers:**
   - Add: `https://your-project.vercel.app/api/auth/callback/facebook`
   - Make app "Live" (toggle at top)

### Step 3: Redeploy
- Push to GitHub (auto-deploys)
- Or click "Redeploy" in Vercel

---

## ✅ Checklist

- [ ] Created Google OAuth credentials
- [ ] Created Facebook OAuth app
- [ ] Added all variables to `.env.local`
- [ ] Restarted dev server
- [ ] Tested Google login locally
- [ ] Tested Facebook login locally
- [ ] Added variables to Vercel
- [ ] Updated OAuth redirect URIs with Vercel domain
- [ ] Tested on production

---

## 🐛 Quick Fixes

**"Redirect URI mismatch"**
→ Check your redirect URIs match exactly (including http/https)

**"Invalid client"**
→ Double-check Client ID and Secret are correct

**Facebook "App not set up"**
→ Make sure you added Facebook Login product

**Google "App not verified"**
→ Click "Advanced" → "Go to ShopVerse (unsafe)" for testing

**Changes not working**
→ Restart dev server after changing `.env.local`

---

## 📞 Need Help?

Check the detailed guide: `OAUTH_SETUP_GUIDE.md`

---

**That's it! You're done! 🎉**
