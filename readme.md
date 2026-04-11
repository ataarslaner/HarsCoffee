# Hars Coffee Digital Menu

A mobile-first, lightweight web app for Hars Coffee's digital menu. Customers can scan QR codes on tables to view the menu.

## Features

- 📱 Mobile-first responsive design
- 🍽️ Complete menu with all categories and items
- 🎨 Clean, minimalist UI with Hars Coffee branding
- ⚡ Fast static generation with Next.js 14
- 🔍 Type-safe with TypeScript and Zod validation

## Tech Stack

- **Framework**: Next.js 14 (App Router, React Server Components)
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript + Zod
- **Data**: Static JSON (Phase 1) → Supabase (Phase 2)
- **Hosting**: Vercel-ready

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with LogoHeader
│   ├── page.tsx                # Redirects to first category
│   ├── menu/
│   │   ├── [category]/page.tsx # Dynamic category pages
│   │   └── loading.tsx         # Loading component
│   ├── admin/                  # Phase 2 admin panel
│   └── api/qr/route.ts         # QR code generation API
├── components/
│   ├── LogoHeader.tsx          # Collapsible header with logo
│   ├── MenuItemCard.tsx        # Individual menu item display
│   └── TabBar.tsx              # Category navigation
├── data/
│   └── menu.json               # Menu data (Phase 1)
└── lib/
    └── types.ts                # TypeScript types and Zod schemas
```

## Menu Categories

- **Yiyecekler** - Food items
- **Hars Summer Edition** - Summer specials
- **Soguk İçecekler** - Cold drinks
- **Soğuk Kahveler** - Cold coffees
- **Hars Matcha** - Matcha drinks
- **Klasik Kahveler** - Classic coffees
- **Çay & Türk Kahvesi** - Tea & Turkish coffee

## Deployment

The app is ready for deployment on Vercel:

1. Connect your repository to Vercel
2. Deploy automatically on push to main branch
3. Custom domain can be configured in Vercel dashboard

## Phase 2 Roadmap

- [ ] Supabase integration for dynamic menu management
- [ ] Admin panel for menu updates
- [ ] Real-time menu updates
- [ ] Item images and badges (Vegan, New)
- [ ] Dark mode support
- [ ] PWA manifest and offline cache

## API Endpoints

- `GET /api/qr?table=12` - Generate QR code for specific table

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

Built for Hars Coffee by Ahmet Eren Öztürkmen