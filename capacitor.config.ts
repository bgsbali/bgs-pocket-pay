import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7ad94208dd084a0884aec958cf27e2f4',
  appName: 'BGS Wallet',
  webDir: 'dist',
  server: {
    url: 'https://7ad94208-dd08-4a08-84ae-c958cf27e2f4.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1589D6',
      showSpinner: false,
    },
  },
};

export default config;
