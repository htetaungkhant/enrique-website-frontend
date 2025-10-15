# Arise Bufo Alvarius - Website Frontend

A comprehensive Next.js web application for Arise Bufo Alvarius, featuring ceremony bookings, course offerings, blog management, and an admin dashboard. This project uses the Pages Router architecture with NextAuth for authentication, Stripe for payments, and a rich set of UI components.

## 🚀 Tech Stack

- **Framework**: [Next.js 15.1.7](https://nextjs.org) (Pages Router)
- **React**: 18.3.1
- **Authentication**: NextAuth.js 4.24
- **Payments**: Stripe
- **State Management**: Redux Toolkit with Redux Persist
- **UI Components**: Radix UI primitives with custom components
- **Rich Text Editor**: Tiptap
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS 4 with animations
- **Data Fetching**: TanStack React Query
- **Animations**: Motion (Framer Motion successor)
- **Icons**: Lucide React & React Icons

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun
- Stripe account for payment processing
- Google OAuth credentials (for social login)

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd enrique-website-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and configure the following environment variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_API=https://api.arisebufoalvarius.com
NEXTAUTH_X_API_KEY=your-api-key

# Chatbot
CHATBOT_URL=https://chatbot-296879671478.us-central1.run.app

# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

> **Note**: See `.env.local` file for the complete configuration template.

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

```
├── components/           # React components
│   ├── Admin/           # Admin dashboard components
│   ├── BlogsPage/       # Blog-related components
│   ├── CeremoniesPage/  # Ceremony booking components
│   ├── common/          # Shared/reusable components
│   ├── CourseOfferingsPage/
│   ├── FacilitatorsPage/
│   ├── HomePage/
│   ├── Profile/
│   ├── QuestionnairePage/
│   └── ui/              # Radix UI components
├── hooks/               # Custom React hooks
│   ├── adminAuth.js
│   ├── userAuth.js
│   └── useQuestionnaire.js
├── lib/                 # Utility functions and API
│   ├── utils.js
│   └── inhouseAPI/      # API client functions
├── pages/               # Next.js pages (Pages Router)
│   ├── _app.js          # Custom App component
│   ├── _document.js     # Custom Document
│   ├── admin/           # Admin routes
│   ├── api/             # API routes
│   ├── blogs/           # Blog pages
│   ├── ceremonies/      # Ceremony pages
│   ├── course-offerings/
│   ├── profile/
│   └── user-auth-pages/
├── providers/           # React context providers
├── public/              # Static assets
│   ├── dummy-data/
│   ├── icon/
│   ├── image/
│   ├── logo/
│   └── pdf/
├── store/               # Redux store configuration
└── styles/              # Global styles
```

## 🔐 Authentication & Authorization

The application implements a dual authentication system:

- **User Authentication**: For regular users accessing ceremonies, courses, and profiles
- **Admin Authentication**: Separate authentication for admin dashboard access

### Middleware Protection

The `middleware.js` file handles route protection:
- Public routes (homepage, blog, ceremonies, etc.)
- Protected user routes (profile, bookings)
- Protected admin routes (admin dashboard)

### Test Credentials

See `.env.local` for test account credentials (development only).

## 🎨 Key Features

### Public Features
- **Homepage**: Banner, gallery, and featured content
- **Ceremonies**: Browse and book ceremonies (Ayahuasca, Bufo Alvarius, Kambo, etc.)
- **Course Offerings**: View and enroll in courses
- **Blog**: Read articles and insights
- **Facilitators**: Meet the team
- **Questionnaire**: Interactive assessment tool
- **Chatbot**: AI-powered support

### User Features
- **Authentication**: Login/Register with email or Google OAuth
- **Profile Management**: Edit profile and view bookings
- **Stripe Checkout**: Secure payment processing
- **Booking History**: Track ceremony and course enrollments

### Admin Features
- **Dashboard**: Overview of platform metrics
- **Blog Management**: Create, edit, and delete blog posts (Tiptap editor)
- **Ceremony Management**: Manage ceremony listings and bookings
- **Course Management**: Handle course offerings
- **Facilitator Management**: Add and update facilitator profiles

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 UI Components

The project uses a combination of:
- **Radix UI**: Accessible component primitives (Dialog, Dropdown, Accordion, etc.)
- **Custom Components**: Tailored UI elements in `components/common/` and `components/ui/`
- **Tailwind CSS**: Utility-first styling with custom configurations
- **shadcn/ui**: Component library pattern (configured via `components.json`)

## 🔌 API Integration

The application connects to a backend API:
- Base URL: `https://api.arisebufoalvarius.com` (production)
- API client utilities in `lib/inhouseAPI/`
- NextAuth for session management and API authentication
- API routes in `pages/api/` for server-side operations

## 💳 Payment Processing

- **Stripe Integration**: Checkout forms for ceremonies and courses
- Components: `CheckoutForm.js` in respective feature folders
- Stripe Publishable Key: Configured via environment variables
- Supports guest checkout functionality

## 🌍 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Configure environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

For more deployment options, see [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying).

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Stripe Documentation](https://stripe.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com)
- [TanStack Query Documentation](https://tanstack.com/query)

## 🤝 Contributing

This is a private project. If you have access, please follow the development guidelines and create pull requests for any changes.

## 📄 License

Private and proprietary. All rights reserved.
