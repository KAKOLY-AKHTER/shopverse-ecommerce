# Fix: Server Error on Add Item & Manage Products

## 🐛 Problem

Getting "Server Error" when accessing:
- `/add-item`
- `/manage-products`

## 🔍 Root Cause

NextAuth environment variables are not set in Vercel deployment.

## ✅ Solution: Add Environment Variables to Vercel

### Step 1: Login to Vercel Dashboard

Go to: https://vercel.com/dashboard

### Step 2: Select Your Project

Click on "shopverse-ecommerce"

### Step 3: Go to Settings

Click "Settings" tab at the top

### Step 4: Add Environment Variables

1. Click "Environment Variables" in left sidebar
2. Add these variables one by one:

#### Required Variables:

**NEXTAUTH_SECRET**
```
Value: shopverse-secret-key-2024-production-vercel
```
(Or generate a new one: https://generate-secret.vercel.app/32)

**NEXTAUTH_URL**
```
Value: https://shopverse-ecommerce-nx3jxt85y-kakolys-projects.vercel.app
```
(Replace with your actual Vercel URL)

#### Optional (For OAuth - Can skip for now):

**GOOGLE_CLIENT_ID**
```
Value: demo-google-client-id
```

**GOOGLE_CLIENT_SECRET**
```
Value: demo-google-client-secret
```

**FACEBOOK_CLIENT_ID**
```
Value: demo-facebook-client-id
```

**FACEBOOK_CLIENT_SECRET**
```
Value: demo-facebook-client-secret
```

### Step 5: Select Environment

For each variable, select:
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 6: Save

Click "Save" for each variable

### Step 7: Redeploy

1. Go to "Deployments" tab
2. Click on the latest deployment
3. Click the three dots (•••) menu
4. Click "Redeploy"
5. Confirm redeploy

### Step 8: Wait for Deployment

Wait 1-2 minutes for deployment to complete

### Step 9: Test

1. Go to your site
2. Login with: admin@shopverse.com / password123
3. Try accessing:
   - `/add-item` - Should work now ✅
   - `/manage-products` - Should work now ✅

## 🎯 Quick Fix Summary

**Minimum Required Variables:**
```env
NEXTAUTH_SECRET=shopverse-secret-key-2024-production-vercel
NEXTAUTH_URL=https://your-vercel-url.vercel.app
```

**That's it!** These 2 variables will fix the server error.

## 🔄 Alternative: Use Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add environment variables
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# Redeploy
vercel --prod
```

## ✅ Verification

After redeploying, test these URLs:
- ✅ https://your-site.vercel.app/login
- ✅ https://your-site.vercel.app/add-item
- ✅ https://your-site.vercel.app/manage-products

All should work without server errors!

## 🐛 Still Getting Errors?

### Check Vercel Logs:

1. Go to "Deployments" tab
2. Click on latest deployment
3. Click "View Function Logs"
4. Look for error messages

### Common Issues:

**Issue**: "NEXTAUTH_URL is not set"
**Fix**: Add NEXTAUTH_URL environment variable

**Issue**: "Invalid secret"
**Fix**: Generate new secret and add to Vercel

**Issue**: "Middleware error"
**Fix**: Make sure NEXTAUTH_SECRET is set

## 📞 Need Help?

Check these files:
- `VERCEL_PUBLIC_ACCESS.md` - Public access setup
- `OAUTH_SETUP_GUIDE.md` - OAuth configuration
- `README.md` - Main documentation

---

**After adding environment variables and redeploying, your site will work perfectly!** 🚀
