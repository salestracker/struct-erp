import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aierpnext.app',
  appName: 'AI ERP',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  plugins: {
    // Add any required Capacitor plugins here
  }
};

export default config;
