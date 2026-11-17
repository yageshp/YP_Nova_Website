/** YP Nova design tokens — keep in sync with src/styles/index.css */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        navy: '#10172D',
        brand: '#6028D7',
        purple: '#7C3AED',
        soft: '#A78BFA',
        lavender: '#F2ECFF',
        ice: '#EAF8FF',
        ink: '#182033',
        muted: '#5B697F',
        line: '#ECEAF2',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Manrope Variable"', 'Manrope', '"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: { site: '1200px' },
      boxShadow: {
        card: '0 1px 2px rgba(16,23,45,0.04), 0 6px 20px rgba(16,23,45,0.05)',
        lift: '0 2px 4px rgba(16,23,45,0.04), 0 16px 40px rgba(96,40,215,0.14)',
        cta: '0 6px 20px rgba(96,40,215,0.28)',
      },
      screens: { xs: '400px' },
    },
  },
  plugins: [],
};
