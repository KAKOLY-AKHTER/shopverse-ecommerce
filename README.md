# ShopVerse - Premium E-commerce Application

A modern, full-featured e-commerce platform built with Next.js 16, featuring authentication, product management, cart, and wishlist functionality.

## 🚀 Live Demo

- **Live Site**: [https://shopverse-ecommerce-nx3jxt85y-kakolys-projects.vercel.app](https://shopverse-ecommerce-nx3jxt85y-kakolys-projects.vercel.app)
- **GitHub Repository**: [https://github.com/KAKOLY-AKHTER/shopverse-ecommerce](https://github.com/KAKOLY-AKHTER/shopverse-ecommerce)

## 🔐 Login Credentials

For testing the application, use these credentials:

- **Email**: `admin@shopverse.com`
- **Password**: `password123`

## 📋 Project Description

ShopVerse is a comprehensive e-commerce application that provides a seamless shopping experience with modern UI/UX design. The application features product browsing, detailed product views, shopping cart, wishlist, and user authentication. Built with Next.js 16 App Router, it demonstrates best practices in modern web development.

## ✨ Key Features

### Core Features
1. **Landing Page** - 7+ sections including Hero, Features, Products, About, Testimonials, Newsletter, and CTA
2. **Authentication System** - Mock login with hardcoded credentials + NextAuth.js with Google OAuth
3. **Product Listing** - Browse products with search, filter, sort, and pagination
4. **Product Details** - Detailed product view with images, specifications, and features
5. **Add Product** - Protected page for authenticated users to add new products
6. **Toast Notifications** - Real-time feedback for user actions

### Bonus Features
- 🛒 **Shopping Cart** - Add/remove items, update quantities, view total
- ❤️ **Wishlist** - Save favorite products for later
- 🌓 **Dark/Light Theme** - Toggle between themes with persistent storage
- 🎨 **Animations** - Smooth Framer Motion animations throughout
- 📱 **Responsive Design** - Mobile-first, fully responsive layout
- 🎯 **Advanced Filtering** - Search, category filter, and multiple sort options
- 📄 **Pagination** - Efficient product browsing with pagination
- 🎭 **Hero Slider** - Auto-sliding background images with dynamic content

## 🛠️ Technologies Used

- **Frontend Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js
- **State Management**: React Context API
- **Storage**: localStorage for cart/wishlist
- **Notifications**: react-hot-toast
- **Image Handling**: Next.js Image component
- **Deployment**: Vercel

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/KAKOLY-AKHTER/shopverse-ecommerce.git
cd shopverse-ecommerce
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
shopverse-ecommerce/
├── public/
│   └── images/
│       └── products/          # Product images
├── src/
│   └── app/
│       ├── add-item/          # Protected: Add product page
│       ├── api/
│       │   └── auth/          # NextAuth API routes
│       ├── cart/              # Shopping cart page
│       ├── components/        # Reusable components
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   └── SessionWrapper.jsx
│       ├── context/           # React Context providers
│       │   ├── AuthContext.jsx
│       │   ├── CartContext.jsx
│       │   └── ThemeContext.jsx
│       ├── data/              # Product data
│       │   └── products.js
│       ├── items/             # Product listing & details
│       │   ├── page.jsx       # List page
│       │   └── [id]/          # Dynamic detail page
│       ├── login/             # Login page
│       ├── wishlist/          # Wishlist page
│       ├── layout.jsx         # Root layout
│       ├── page.jsx           # Landing page
│       └── globals.css        # Global styles
├── middleware.js              # Route protection
└── next.config.mjs            # Next.js configuration
```

## 🗺️ Route Summary

### Public Routes (No Authentication Required)
- `/` - Landing page with 7+ sections
- `/items` - Product listing with search, filter, sort, pagination
- `/items/[id]` - Individual product details
- `/login` - Login page with mock and OAuth options
- `/cart` - Shopping cart (accessible but data stored locally)
- `/wishlist` - Wishlist (accessible but data stored locally)

### Protected Routes (Authentication Required)
- `/add-item` - Add new product form (redirects to login if not authenticated)

## 🎯 Implemented Features

### 1. Landing Page
- **Hero Section**: Auto-sliding background images with dynamic titles
- **Features Section**: Why choose ShopVerse with animated cards
- **Featured Products**: Top 3 products showcase
- **About Section**: Company information with statistics
- **Testimonials**: Customer reviews
- **Newsletter**: Email subscription form
- **CTA Section**: Call-to-action for shopping

### 2. Authentication
- **Mock Login**: Hardcoded credentials stored in cookies
- **NextAuth.js**: Google OAuth integration
- **Session Management**: Persistent login state
- **Protected Routes**: Middleware-based route protection
- **Auto Redirect**: Redirect to items page after login

### 3. Product Management
- **Product Listing**: Grid layout with cards
- **Search**: Real-time search by name/description
- **Filter**: Category-based filtering
- **Sort**: Multiple sort options (name, price, rating, popularity)
- **Pagination**: 8 items per page with page navigation
- **Product Details**: Full product information with image gallery
- **Add Product**: Form to add new products (protected)

### 4. Shopping Features
- **Cart System**: Add/remove items, update quantities
- **Wishlist**: Save favorite products
- **Local Storage**: Persistent cart and wishlist data
- **Count Badges**: Visual indicators in navbar
- **Toast Notifications**: Feedback for all actions

### 5. UI/UX Enhancements
- **Dark/Light Theme**: Toggle with persistent preference
- **Responsive Design**: Mobile, tablet, desktop optimized
- **Animations**: Smooth transitions and hover effects
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Professional Design**: Gradient colors and modern styling

## 🔧 Configuration

### NextAuth Configuration
The application uses NextAuth.js for authentication. Configure providers in `src/app/api/auth/[...nextauth]/route.js`.

### Theme Configuration
Theme settings are managed in `src/app/context/ThemeContext.jsx` with localStorage persistence.

### Product Data
Products are stored in `src/app/data/products.js`. New products added via the form are stored in localStorage.

## 🚀 Deployment

The application is deployed on Vercel:

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

## 📝 Notes

- **Data Storage**: Products are stored in JSON file and localStorage (Express.js server is optional)
- **Image Upload**: Currently uses placeholder images for new products
- **Authentication**: Both mock and OAuth methods are implemented
- **Responsive**: Fully responsive across all devices
- **Performance**: Optimized with Next.js Image component and lazy loading

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Kakoly Akhter**
- GitHub: [@KAKOLY-AKHTER](https://github.com/KAKOLY-AKHTER)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- Tailwind CSS for styling utilities
- Framer Motion for animations
