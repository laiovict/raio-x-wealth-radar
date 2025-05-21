
/**
 * Standardized themes and styles for consistent visual identity across modules
 */

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBackground: string;
  text: string;
  subtext: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export interface ThemeStyles {
  card: string;
  cardHeader: string;
  cardContent: string;
  title: string;
  subtitle: string;
  text: string;
  button: string;
  statCard: string;
  statValue: string;
  statLabel: string;
}

export interface ModuleTheme {
  colors: ThemeColors;
  styles: ThemeStyles;
}

// Reinvent theme - core brand identity
export const reinventTheme: ModuleTheme = {
  colors: {
    primary: '#6680FF', // Reinvent Blue
    secondary: '#121218', // Dark background
    accent: '#3D56CC', // Darker blue
    background: '#0f0f11',
    cardBackground: '#121218',
    text: '#FFFFFF',
    subtext: '#94A3B8',
    border: 'rgba(255, 255, 255, 0.1)',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6'
  },
  styles: {
    card: 'bg-gradient-to-br from-[#121218] to-[#1a1a24] border border-white/10 rounded-xl shadow-lg overflow-hidden',
    cardHeader: 'bg-gradient-to-br from-[#1a1a24] to-[#121218] border-b border-white/5 p-4',
    cardContent: 'p-4',
    title: 'text-lg font-medium text-white',
    subtitle: 'text-sm text-[#6680FF]',
    text: 'text-gray-300',
    button: 'bg-gradient-to-r from-[#6680FF] to-[#3D56CC] hover:from-[#5570EE] hover:to-[#3050CC] text-white rounded-lg px-4 py-2 transition-colors',
    statCard: 'bg-black/30 border border-white/10 rounded-lg p-3',
    statValue: 'text-xl font-bold text-white',
    statLabel: 'text-xs text-gray-400'
  }
};

// Dark theme - alternative styling for variety
export const darkTheme: ModuleTheme = {
  colors: {
    primary: '#3B82F6', // Blue
    secondary: '#1F2937',
    accent: '#6366F1',
    background: '#111827',
    cardBackground: '#1F2937',
    text: '#F9FAFB',
    subtext: '#9CA3AF',
    border: 'rgba(255, 255, 255, 0.05)',
    success: '#10B981',
    warning: '#FBBF24',
    danger: '#EF4444',
    info: '#60A5FA'
  },
  styles: {
    card: 'bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-xl shadow-lg overflow-hidden',
    cardHeader: 'bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-white/5',
    cardContent: 'p-4',
    title: 'text-lg font-medium text-white',
    subtitle: 'text-sm text-blue-400',
    text: 'text-gray-300',
    button: 'bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors',
    statCard: 'bg-black/20 border border-white/5 rounded-lg p-4',
    statValue: 'text-xl font-bold text-white',
    statLabel: 'text-xs text-gray-400'
  }
};

// Helper function to get a theme by name
export function getTheme(themeName: 'reinvent' | 'dark' = 'reinvent'): ModuleTheme {
  switch (themeName) {
    case 'dark':
      return darkTheme;
    case 'reinvent':
    default:
      return reinventTheme;
  }
}

// CSS class helpers for common element types
export const cssClasses = {
  card: 'module-card',
  header: 'module-header',
  content: 'module-content',
  title: 'module-title',
  icon: 'module-icon',
  statGrid: 'stat-grid',
  statCard: 'stat-card',
  statLabel: 'stat-label',
  statValue: 'stat-value',
  trendUp: 'stat-trend-up',
  trendDown: 'stat-trend-down'
};

export default {
  reinventTheme,
  darkTheme,
  getTheme,
  cssClasses
};
