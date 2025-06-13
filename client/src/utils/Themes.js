// Animation constants for consistent transitions
export const animations = {
  transition: {
    default: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    fast: 'all 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)',
    slow: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)'
  },
  scale: {
    hover: 'scale(1.02)',
    active: 'scale(0.98)'
  }
};

// Shadow styles for different elevations
export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)',
  md: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
  lg: '0 10px 25px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.05)',
  xl: '0 20px 40px rgba(0,0,0,0.12)',
  glow: (color) => `0 0 15px ${color}40, 0 0 5px ${color}20`,
  card: '0 10px 20px rgba(0,0,0,0.05), 0 6px 6px rgba(0,0,0,0.07)',
  button: '0 4px 14px rgba(0,0,0,0.1)'
};

// Glass effect styles
export const glass = {
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.18)'
};

// Modern gradient styles
export const gradients = {
  primary: 'linear-gradient(135deg, #0061FF 0%, #60EFFF 100%)',
  secondary: 'linear-gradient(135deg, #5B86E5 0%, #36D1DC 100%)',
  success: 'linear-gradient(135deg, #00C853 0%, #B9F6CA 100%)',
  warning: 'linear-gradient(135deg, #FF9800 0%, #FFECB3 100%)',
  danger: 'linear-gradient(135deg, #FF5252 0%, #FF8A80 100%)',
  dark: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
  light: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
  purple: 'linear-gradient(135deg, #9C27B0 0%, #E1BEE7 100%)',
  teal: 'linear-gradient(135deg, #009688 0%, #B2DFDB 100%)',
  blue: 'linear-gradient(135deg, #2196F3 0%, #BBDEFB 100%)',
  card: 'linear-gradient(145deg, rgba(255,255,255,0.6) 0%, rgba(240,240,240,0.6) 100%)'
};

export const lightTheme = {
  // Base colors
  bg: '#F8FAFC',
  bgLight: '#FFFFFF',
  bgGradient: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
  primary: '#0061FF',
  primaryLight: '#60EFFF',
  primaryGradient: gradients.primary,
  secondary: '#5B86E5',
  secondaryLight: '#36D1DC',
  secondaryGradient: gradients.secondary,

  // UI elements
  disabled: '#CBD5E1',
  menubar: 'rgba(25, 28, 41, 0.95)',
  navbar: 'rgba(36, 43, 63, 0.92)',
  navbarGlass: {
    background: 'rgba(36, 43, 63, 0.85)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  arrow: '#94A3B8',
  menu_primary_text: '#F8FAFC',
  menu_secondary_text: '#CBD5E1',
  table_header: 'rgba(36, 36, 69, 0.95)',
  
  // Text colors
  text_primary: '#1E293B',
  text_secondary: '#475569',
  text_tertiary: '#64748B',
  
  // Card styling
  card: '#FFFFFF',
  cardGradient: gradients.card,
  cardGlass: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
  },
  
  // Basic colors
  black: '#0F172A',
  white: '#FFFFFF',
  shadow: 'rgba(0, 0, 0, 0.1)',
  
  // Status colors
  green: '#10B981',
  greenLight: '#D1FAE5',
  greenGradient: gradients.success,
  yellow: '#F59E0B',
  yellowLight: '#FEF3C7',
  yellowGradient: gradients.warning,
  red: '#EF4444',
  redLight: '#FEE2E2',
  redGradient: gradients.danger,
  orange: '#F97316',
  orangeLight: '#FFEDD5',
  
  // Popup styling
  popup: 'rgba(36, 43, 63, 0.95)',
  popupGlass: {
    background: 'rgba(36, 43, 63, 0.85)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  popup_text_primary: '#F8FAFC',
  popup_text_secondary: '#CBD5E1',
  
  // Other UI elements
  output_node: '#49516b',
  
  // Animation properties
  transition: animations.transition,
  shadows: shadows,
  glass: glass,
  gradients: gradients
};

// You can add a dark theme here if needed

