# BGS Wallet App - Capacitor Mobile Setup

This guide will help you build and run the BGS Wallet App on iOS and Android devices.

## Prerequisites

- Node.js 18+ and npm installed
- For iOS: Mac with Xcode installed
- For Android: Android Studio installed
- Git (to clone from your repository)

## Initial Setup

The Capacitor dependencies are already installed in this project:
- `@capacitor/core`
- `@capacitor/cli`
- `@capacitor/ios`
- `@capacitor/android`
- `@capacitor/app`

## Configuration

The `capacitor.config.ts` file is already configured with:
- **App ID**: `app.lovable.7ad94208dd084a0884aec958cf27e2f4`
- **App Name**: BGS Wallet
- **Server URL**: Points to Lovable preview (enables hot-reload during development)

## Building for Mobile

### Step 1: Export to GitHub

1. In Lovable, click the "Export to GitHub" button
2. Connect to your GitHub account and create/select a repository
3. Clone the repository to your local machine:

```bash
git clone <YOUR_GITHUB_REPO_URL>
cd <YOUR_PROJECT_FOLDER>
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Add Native Platforms

Add iOS platform (Mac with Xcode required):
```bash
npx cap add ios
```

Add Android platform:
```bash
npx cap add android
```

### Step 4: Build the Web App

```bash
npm run build
```

### Step 5: Sync Capacitor

After building, sync the web app to native platforms:
```bash
npx cap sync
```

**Note**: Run `npx cap sync` whenever you pull changes from GitHub that affect native functionality.

### Step 6: Open in Native IDE

For iOS:
```bash
npx cap open ios
```
This opens Xcode. Press the Play button to run on a simulator or connected device.

For Android:
```bash
npx cap open android
```
This opens Android Studio. Select a device/emulator and click Run.

## Development Workflow

### Hot Reload (Recommended for Development)

The app is configured to hot-reload from the Lovable preview URL. This means:
1. Make changes in Lovable
2. Changes appear instantly in the mobile app
3. No need to rebuild or sync for UI changes

### Testing on Physical Devices

For iOS:
1. Connect your iPhone via USB
2. In Xcode, select your device from the device menu
3. Click Run (may require Apple Developer account for signing)

For Android:
1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect via USB
4. Select your device in Android Studio and click Run

## Production Build

When ready to deploy:

1. **Update Capacitor Config**: Change the server URL to your production domain:
```typescript
// capacitor.config.ts
server: {
  url: 'https://yourdomain.com', // Your production URL
  cleartext: false, // Use HTTPS in production
}
```

2. **Build Production Web App**:
```bash
npm run build
```

3. **Sync Changes**:
```bash
npx cap sync
```

4. **Build Native Apps**:
   - iOS: In Xcode, Product → Archive → Upload to App Store
   - Android: In Android Studio, Build → Generate Signed Bundle/APK

## Troubleshooting

### iOS Build Issues
- Make sure Xcode is up to date
- Check that your Apple Developer account is properly configured
- Try cleaning build: Product → Clean Build Folder

### Android Build Issues
- Ensure Android Studio and SDK are updated
- Check that ANDROID_HOME environment variable is set
- Try invalidating caches: File → Invalidate Caches / Restart

### Hot Reload Not Working
- Check that your device/emulator can reach the Lovable preview URL
- Ensure both device and computer are on the same network
- Try disabling VPN if enabled

## MVP Features Implemented

✅ Authentication (auto-create account)
✅ Wallet balance display
✅ QR code payment system
✅ Top-up instructions (store & online)
✅ Transaction history with filters
✅ Profile management
✅ Help & support page
✅ Auto-logout on inactivity (30 min)
✅ QR code security (blur on touch)

## API Integration

The app currently uses **mock API services**. To connect to real BGS backend:

1. Update `src/services/authService.ts` - Replace mock login with real API
2. Update `src/services/walletService.ts` - Connect to real wallet endpoints
3. Implement Shopify Customer Account integration
4. Configure secure token storage

## Security Notes

- Tokens are stored in localStorage (for MVP)
- For production, use Capacitor's SecureStorage plugin
- QR codes have blur-on-touch security
- Auto-logout after 30 minutes of inactivity
- HTTPS required for production builds

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Development Guide](https://capacitorjs.com/docs/ios)
- [Android Development Guide](https://capacitorjs.com/docs/android)
- [Lovable Cloud Documentation](https://docs.lovable.dev/features/cloud)

## Support

For BGS Wallet App issues:
- Email: support@bgsbali.com
- WhatsApp: +62 857 7374 1556

For Capacitor/mobile build issues:
- Capacitor Discord: https://discord.gg/UPYYRhtyzp
- Stack Overflow: Tag questions with `capacitor`
