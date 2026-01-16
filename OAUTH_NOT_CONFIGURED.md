# 🔐 OAuth Login Not Configured

You're seeing errors when clicking Google or Facebook login buttons because OAuth credentials are not set up yet.

## ⚡ Quick Fix (Choose One):

### Option 1: Use Mock Login (Instant - No Setup Required) ✅

Just use the regular login form with these credentials:

```
Email: admin@shopverse.com
Password: password123
```

**This works immediately without any setup!**

---

### Option 2: Setup Real OAuth (5-10 minutes)

Follow these guides to enable Google/Facebook login:

1. **Quick Guide**: `QUICK_OAUTH_SETUP.md` (5 minutes)
2. **Detailed Guide**: `OAUTH_SETUP_GUIDE.md` (complete instructions)

**Steps Summary:**

1. **Create OAuth Apps:**
   - Google: https://console.cloud.google.com/
   - Facebook: https://developers.facebook.com/

2. **Get Credentials:**
   - Copy Client ID and Secret from each platform

3. **Update .env.local:**
   ```env
   GOOGLE_CLIENT_ID=your-real-id
   GOOGLE_CLIENT_SECRET=your-real-secret
   FACEBOOK_CLIENT_ID=your-real-id
   FACEBOOK_CLIENT_SECRET=your-real-secret
   ```

4. **Restart Server:**
   ```bash
   npm run dev
   ```

---

## 🎯 For Vercel Deployment

If deploying to Vercel:

1. Add environment variables in Vercel dashboard
2. Update OAuth redirect URIs with your Vercel domain
3. Redeploy

See `QUICK_OAUTH_SETUP.md` for detailed Vercel instructions.

---

## ❓ Why This Error?

The error happens because:
- OAuth apps need to be created in Google/Facebook
- Real credentials need to be added to `.env.local`
- Demo credentials don't work for actual authentication

**Solution**: Either use mock login OR setup real OAuth credentials.

---

## 📚 Documentation Files

- `QUICK_OAUTH_SETUP.md` - Fast 5-minute setup guide
- `OAUTH_SETUP_GUIDE.md` - Complete detailed guide
- `.env.example` - Environment variables template
- `README.md` - Main project documentation

---

## 💡 Recommendation

**For Testing/Development:**
→ Use mock login (admin@shopverse.com / password123)

**For Production:**
→ Setup real OAuth credentials following the guides

---

**Need help?** Check the setup guides or use mock login to test the app immediately!
