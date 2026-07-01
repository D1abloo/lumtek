/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        lumtek: {
          dark: '#0F172A',
          black: '#000000',
          blue: '#00A8FF',
          cyan: '#22D3EE',
          violet: '#7C3AED',
          green: '#22C55E',
          surface: '#F8FAFC',
          muted: '#EEF2F7',
          border: '#DCE3EA',
          text: '#0F172A',
          'text-secondary': '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        app: ['Syne', 'system-ui', 'sans-serif'],
        'app-body': ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderColor: {
        soft: '#DCE3EA',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(15, 23, 42, 0.06)',
        card: '0 8px 32px rgba(15, 23, 42, 0.08)',
        glow: '0 8px 32px rgba(0, 168, 255, 0.15)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'phone-aura': {
          '0%, 100%': {
            opacity: '0.55',
            transform: 'scale(1)',
            filter: 'blur(28px)',
          },
          '50%': {
            opacity: '0.9',
            transform: 'scale(1.06)',
            filter: 'blur(32px)',
          },
        },
        'phone-rim': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        scan: 'scan 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        blink: 'blink 1.2s ease-in-out infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
        'phone-aura': 'phone-aura 4.5s ease-in-out infinite',
        'phone-rim': 'phone-rim 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
