# Bachelor Point 🏠

A modern accommodation platform connecting students and bachelors with verified, affordable housing across Bangladesh.

## ✨ Features

- **🔍 Smart Search**: Advanced filtering by location, price, amenities
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **🌐 Bilingual Support**: English and Bengali language support
- **💳 Point-based System**: Pay only for what you need
- **📞 OTP Authentication**: Secure phone-based login
- **✅ Verified Properties**: All listings are verified for quality
- **💚 Modern UI**: Clean, accessible design with Tailwind CSS

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Frontend**: React 19.1.0, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Build Tool**: Turbopack
- **State Management**: React Context API

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout with providers
│   ├── page.tsx        # Home page
│   ├── globals.css     # Global styles
│   └── [routes]/       # Dynamic routes
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components (Button, Input, etc.)
│   ├── Header.tsx     # Navigation header
│   ├── Hero.tsx       # Landing page hero
│   ├── Pricing.tsx    # Pricing plans
│   └── SearchResults.tsx # Search results page
├── contexts/          # React Context providers
│   └── AuthContext.tsx # Authentication state
├── hooks/             # Custom React hooks
│   └── use-toast.ts   # Toast notifications
├── lib/               # Utility libraries
│   └── utils.ts       # Utility functions
├── types/             # TypeScript type definitions
│   └── index.ts       # Application types
├── constants/         # Application constants
│   └── index.ts       # Constants and enums
├── utils/             # Helper functions
│   └── index.ts       # Utility functions
└── assets/            # Static assets (images, etc.)
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd idea_bp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Architecture Decisions

### Why Next.js App Router?
- **Performance**: Server-side rendering and static generation
- **SEO**: Better search engine optimization
- **Developer Experience**: File-based routing and built-in optimizations

### Why Tailwind CSS v4?
- **Modern**: Latest features and improvements
- **Performance**: Smaller bundle size and faster builds
- **Flexibility**: Highly customizable design system

### Why Radix UI?
- **Accessibility**: WAI-ARIA compliant components
- **Customization**: Unstyled components for design flexibility
- **Quality**: Battle-tested and well-maintained

### Component Structure
- **Separation of Concerns**: UI, business logic, and state management are separated
- **Reusability**: Components are designed to be reusable across the application
- **Type Safety**: Full TypeScript support for better development experience

## 🌍 Internationalization

The application supports both English and Bengali:
- Language switching in the header
- All user-facing text has translations
- Currency formatting in Bangladeshi Taka (৳)
- Phone number validation for Bangladesh

## 🎨 Design System

### Colors
- **Primary**: Green theme (#22c55e)
- **Background**: Gradient from #CFFFE2 to white
- **Text**: Consistent gray scale for hierarchy

### Typography
- **Fonts**: Geist Sans for UI, Geist Mono for code
- **Sizes**: Responsive typography with Tailwind classes

### Components
- **Consistent**: All components follow the same design patterns
- **Accessible**: WCAG compliance with Radix UI
- **Responsive**: Mobile-first design approach

## 🔐 Authentication Flow

1. **Phone Number Entry**: User enters their phone number
2. **OTP Generation**: 6-digit OTP sent via SMS
3. **Verification**: User enters OTP for verification
4. **Success**: User is logged in with 5 free points

## 💰 Point System

- **Free Start**: 5 points for new users
- **Contact Cost**: 1 point to contact property owner
- **Plans Available**:
  - Starter: 5 points for ৳50
  - Popular: 10 points for ৳80
  - Premium: 20 points for ৳150

## 🔄 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real SMS integration for OTP
- [ ] Payment gateway integration
- [ ] Property owner dashboard
- [ ] Review and rating system
- [ ] Google Maps integration
- [ ] Push notifications
- [ ] Mobile app (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@bachelorpoint.com or join our community Discord.

---

**Made with ❤️ for the students and bachelors of Bangladesh**
