import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.spoti5.app',
  appName: 'spoti5',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
