# BGS Wallet App - Mobile Payment System

A mobile cashless payment and member system for BGS Surf Supply & Coffee Bar customers. Built with React + TypeScript + Capacitor for iOS and Android.

## 🌊 Features

- **Digital Wallet**: View balance and recent transactions
- **QR Payments**: Pay in-store by showing QR code to cashier
- **Top Up**: Add balance at store (cash/QRIS) or online
- **Transaction History**: Track all payments and top-ups
- **Profile Management**: Update personal information
- **Auto-Login**: Account auto-created on first sign-in
- **Security**: Auto-logout after 30 min inactivity, QR blur protection

## 🚀 Quick Start

### Web Development
```bash
npm install
npm run dev
```

### Mobile Development
See [CAPACITOR_SETUP.md](./CAPACITOR_SETUP.md) for detailed instructions on building iOS and Android apps.

## 📱 App Structure

```
src/
├── pages/          # Main app screens
│   ├── Auth.tsx           # Login/signup
│   ├── Wallet.tsx         # Balance & recent transactions
│   ├── Pay.tsx            # QR code payment
│   ├── TopUp.tsx          # Top-up instructions
│   ├── Transactions.tsx   # Full transaction history
│   ├── Profile.tsx        # User profile management
│   └── Help.tsx           # Help & support
├── components/     # Reusable components
├── contexts/       # Auth context
├── services/       # API services (mock for MVP)
└── types/          # TypeScript interfaces
```

## 🎨 Design System

- **Colors**: Ocean blue primary, sunset orange secondary, teal accent
- **Font**: Outfit (Google Fonts)
- **Theme**: Clean, modern, mobile-first design inspired by GoPay/OVO
- **Components**: Built on shadcn/ui with custom variants

## 🔐 Authentication

- Email + password login
- Auto-creates account if email doesn't exist
- Linked to Shopify Customer Account (ready for integration)
- Secure token storage
- Auto-logout on inactivity

## 📊 MVP Scope

✅ Customer wallet with balance
✅ QR code payment system
✅ Top-up instructions (store & online)
✅ Transaction history
✅ Profile management
✅ Help & support

❌ Not in MVP: Admin dashboard, push notifications, transfers, gift cards, promo system

## 🔌 API Integration

Currently using **mock services**. Replace with real BGS backend:

1. `src/services/authService.ts` - Authentication API
2. `src/services/walletService.ts` - Wallet & transaction API
3. Shopify Storefront API integration for customer sync

## 📲 Mobile Build

```bash
# 1. Export to GitHub from Lovable
# 2. Clone and install dependencies
git clone <your-repo>
npm install

# 3. Add platforms
npx cap add ios
npx cap add android

# 4. Build and sync
npm run build
npx cap sync

# 5. Open in native IDE
npx cap open ios     # For iOS (Xcode)
npx cap open android # For Android Studio
```

## 🌐 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **Mobile**: Capacitor 6
- **QR Codes**: qrcode.react
- **State**: React Context + Hooks

## 📝 Environment

- Lovable preview URL configured for hot-reload during development
- Change to production URL in `capacitor.config.ts` before publishing

## 🤝 Support

- Email: support@bgsbali.com
- WhatsApp: +62 857 7374 1556

## 📄 License

© 2025 BGS Surf Supply & Coffee Bar. All rights reserved.
