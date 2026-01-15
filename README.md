# ShopVerse - Premium E-commerce Application

A modern e-commerce platform built with Next.js 16 (App Router) and Express.js, featuring authentication, product management, and a responsive design.

## 🚀 Features

### Core Features
- **Landing Page**: Beautiful homepage with 7 sections (Hero, Features, Products Preview, About, Testimonials, Newsletter, CTA)
- **Authentication**: Mock login system with cookie-based session management
- **Product Catalog**: Browse and search products with filtering and sorting
- **Product Details**: Comprehensive product pages with specifications and features
- **Protected Routes**: Add new products (authentication required)
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Authentication
- **Mock Login Credentials**:
  - Email: `admin@shopverse.com`
  - Password: `password123`
- **NextAuth.js Integration**: 
  - Google OAuth (configured, needs real credentials)
  - Facebook OAuth (configured, needs real credentials)
  - Credentials provider for mock login
- Session-based authentication with JWT
- Protected routes with middleware
- Automatic redirect for unauthenticated users

### Pages & Routes
- `/` - Landing page (public)
- `/items` - Product catalog (public)
- `/items/[id]` - Product details (public)
- `/login` - Authentication page (public)
- `/add-item` - Add new product (protected)

## 🛠 Technologies Used

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS
- **Backend**: Express.js with CORS support
- **Authentication**: NextAuth.js with Google, Facebook, and Credentials providers
- **Session Management**: JWT-based sessions
- **Notifications**: React Hot Toast
- **Styling**: Tailwind CSS with responsive design
- **Icons**: Heroicons (SVG)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Frontend Setup
1. Clone the repository
```bash
git clone <repository-url>
cd next-js-scic-job-task
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Backend Setup (Optional)
1. Navigate to the server directory
```bash
cd server
```

2. Install server dependencies
```bash
npm install
```

3. Start the Express server
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## 🔗 API Endpoints

### Items API
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item (requires authentication)
- `PUT /api/items/:id` - Update item (requires authentication)
- `DELETE /api/items/:id` - Delete item (requires authentication)

### Health Check
- `GET /api/health` - Server health status

## 🎯 Usage

### Testing Authentication
1. Navigate to `/login`
2. **Option 1 - Mock Credentials:**
   - Email: `admin@shopverse.com`
   - Password: `password123`
3. **Option 2 - Social Login (Demo):**
   - Click Google or Facebook buttons to see demo messages
   - For real OAuth, add credentials to `.env.local`
4. After successful login, you'll be redirected to the items page
5. Access the "Add Item" page from the navigation (only available when logged in)

### Setting Up Real OAuth (Optional)
1. **Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
   - Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`

2. **Facebook OAuth:**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app
   - Add Facebook Login product
   - Add `http://localhost:3000/api/auth/callback/facebook` to Valid OAuth Redirect URIs
   - Update `FACEBOOK_CLIENT_ID` and `FACEBOOK_CLIENT_SECRET` in `.env.local`

### Adding Products
1. Ensure you're logged in
2. Navigate to `/add-item`
3. Fill in the product details:
   - Name (required)
   - Description (required)
   - Price (required)
   - Category (required)
   - Features (optional, can add multiple)
   - Stock status
   - Product image (optional)
4. Submit the form to add the product

### Browsing Products
1. Visit `/items` to see the product catalog
2. Use the search bar to find specific products
3. Sort products by name, price, or rating
4. Click on any product to view detailed information

## 🏗 Project Structure

```
├── src/
│   ├── app/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.js       # Navigation component
│   │   │   └── Footer.js       # Footer component
│   │   ├── items/              # Product-related pages
│   │   │   ├── page.jsx        # Product catalog
│   │   │   └── [id]/page.jsx   # Product details
│   │   ├── login/              # Authentication
│   │   │   └── page.jsx        # Login page
│   │   ├── add-item/           # Protected route
│   │   │   └── page.jsx        # Add product form
│   │   ├── globals.css         # Global styles
│   │   ├── layout.js           # Root layout
│   │   ├── page.js             # Landing page
│   │   └── middleware.js       # Route protection
├── server/                     # Express.js API
│   ├── server.js              # Main server file
│   └── package.json           # Server dependencies
├── public/                    # Static assets
└── README.md                  # This file
```

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Modern UI**: Clean, professional design with consistent spacing and typography
- **Interactive Elements**: Hover effects, transitions, and loading states
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Toast Notifications**: User feedback for actions and errors

## 🔒 Security Features

- Route protection middleware
- Cookie-based authentication
- Input validation on forms
- XSS protection through React's built-in sanitization

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings
4. Your app will be live at `https://your-app.vercel.app`

### Environment Variables
For production deployment, consider adding:
- `NEXTAUTH_SECRET` - For NextAuth.js (if implementing)
- `API_URL` - Backend API URL
- `DATABASE_URL` - Database connection string

## 🔄 Future Enhancements

- **NextAuth.js Integration**: Social login with Google/Facebook
- **Database Integration**: PostgreSQL or MongoDB
- **Payment Processing**: Stripe integration
- **User Profiles**: User dashboard and order history
- **Shopping Cart**: Add to cart functionality
- **Reviews & Ratings**: User reviews system
- **Admin Dashboard**: Product management interface
- **Email Notifications**: Order confirmations and updates

## 📝 License

This project is created for demonstration purposes as part of a job task.

## 🤝 Contributing

This is a demonstration project. For any questions or suggestions, please reach out to the developer.

---

**Demo Credentials for Testing:**
- Email: `admin@shopverse.com`
- Password: `password123`
