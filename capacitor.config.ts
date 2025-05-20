
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c59fa3f414ef4ae9a7bed0c5d224e984',
  appName: 'raio-x-wealth-radar',
  webDir: 'dist',
  server: {
    url: 'https://c59fa3f4-14ef-4ae9-a7be-d0c5d224e984.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  }
};

export default config;
