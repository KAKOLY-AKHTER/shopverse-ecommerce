# ShopVerse - Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Git installed on your computer

## Step 1: Push Code to GitHub

1. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ShopVerse e-commerce app"
   ```

2. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name: `shopverse-ecommerce` (or any name you prefer)
   - Don't initialize with README (since you already have code)
   - Click "Create repository"

3. **Push your code to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/shopverse-ecommerce.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Sign Up" or "Log In"
   - Sign in with your GitHub account

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository `shopverse-ecommerce`
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)

4. **Add Environment Variables:**
   Click "Environment Variables" and add these:
   
   ```
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=generate-a-random-secret-key-here
   GOOGLE_CLIENT_ID=demo-google-client-id
   GOOGLE_CLIENT_SECRET=demo-google-client-secret
   FACEBOOK_CLIENT_ID=demo-facebook-client-id
   FACEBOOK_CLIENT_SECRET=demo-facebook-client-secret
   ```

   **Important:** 
   - Replace `your-app-name` with your actual Vercel app URL (you'll get this after deployment)
   - Generate a secure NEXTAUTH_SECRET: Run `openssl rand -base64 32` in terminal
   - For real OAuth, replace demo credentials with actual Google/Facebook OAuth credentials

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment to complete
   - You'll get a live URL like: `https://shopverse-ecommerce.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - What's your project's name? `shopverse-ecommerce`
   - In which directory is your code located? `./`
   - Want to override the settings? `N`

5. **Add Environment Variables:**
   ```bash
   vercel env add NEXTAUTH_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add GOOGLE_CLIENT_ID
   vercel env add GOOGLE_CLIENT_SECRET
   vercel env add FACEBOOK_CLIENT_ID
   vercel env add FACEBOOK_CLIENT_SECRET
   ```

6. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

## Step 3: Update Environment Variables

After first deployment, update `NEXTAUTH_URL`:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Edit `NEXTAUTH_URL` to your actual Vercel URL
3. Redeploy the project

## Step 4: Test Your Deployment

1. **Visit your live site:** `https://your-app-name.vercel.app`
2. **Test features:**
   - ✅ Landing page loads
   - ✅ Products page shows all items with images
   - ✅ Product details page works
   - ✅ Login page (use: admin@shopverse.com / password123)
   - ✅ Add item page (requires login)

## Important Notes

### Authentication
- The app uses mock authentication with credentials:
  - Email: `admin@shopverse.com`
  - Password: `password123`
- OAuth (Google/Facebook) requires real credentials to work in production

### Backend API
- The Express.js backend (`server/server.js`) needs separate deployment
- Options:
  1. Deploy to Vercel as serverless functions
  2. Deploy to Heroku, Railway, or Render
  3. Use Vercel API routes instead

### Images
- All product images are included in the `public/images/products/` folder
- They will be automatically deployed with your app

### Custom Domain (Optional)
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test

### Environment Variables Not Working
- Make sure they're added in Vercel dashboard
- Redeploy after adding/changing variables
- Check variable names match exactly

### Images Not Loading
- Verify images are in `public/images/products/`
- Check image paths in `src/app/data/products.js`
- Ensure image files are committed to Git

### Authentication Issues
- Verify `NEXTAUTH_URL` matches your Vercel URL
- Check `NEXTAUTH_SECRET` is set
- For OAuth, use real credentials from Google/Facebook

## Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch automatically deploys to production
- Pull requests create preview deployments
- View deployment status in Vercel dashboard

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- NextAuth.js Docs: https://next-auth.js.org

---

**Your ShopVerse app is now live! 🎉**
