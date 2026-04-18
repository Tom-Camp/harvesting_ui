/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        'surface-offset': 'var(--color-surface-offset)',
        divider: 'var(--color-divider)',
        border: 'var(--color-border)',
        'text-main': 'var(--color-text-main)',
        'text-muted': 'var(--color-text-muted)',
        'text-faint': 'var(--color-text-faint)',
        primary: 'var(--color-primary)',
        'primary-strong': 'var(--color-primary-strong)',
        'primary-soft': 'var(--color-primary-soft)',
        success: 'var(--color-success)',
        'success-soft': 'var(--color-success-soft)',
        gold: 'var(--color-gold)',
        'gold-soft': 'var(--color-gold-soft)',
        orange: 'var(--color-orange)',
        'orange-soft': 'var(--color-orange-soft)',
        blue: 'var(--color-blue)',
        'blue-soft': 'var(--color-blue-soft)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.06), 0 10px 24px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
