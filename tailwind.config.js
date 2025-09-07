/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          light: '#3B82F6',
          dark: '#1E3A8A',
        },
        surface: '#FFFFFF',
        background: '#F8FAFC',
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
        },
        border: '#E5E7EB',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0,0,0,0.1)',
        'card': '0 1px 3px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
