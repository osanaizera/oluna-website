import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        // Fade animations
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',

        // Slide animations
        'slide-in-bottom': 'slideInBottom 0.5s ease-out',
        'slide-in-top': 'slideInTop 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',

        // Scale animations
        'scale-in': 'scaleIn 0.5s ease-out',
        'scale-in-center': 'scaleInCenter 0.5s ease-out',
        'scale-in-bounce': 'scaleInBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',

        // Thermal animations
        'thermal-pulse': 'thermalPulse 3s ease-in-out infinite',
        'thermal-wave': 'thermalWave 4s ease-in-out infinite',
        'thermal-glow': 'thermalGlow 2s ease-in-out infinite',
        'thermal-float': 'thermalFloat 6s ease-in-out infinite',
        'thermal-scan': 'thermalScan 3s ease-out',
        'thermal-reveal': 'thermalReveal 2s ease-out',

        // Special effects
        shimmer: 'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        // Fade animations
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },

        // Slide animations
        slideInBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },

        // Scale animations
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleInCenter: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleInBounce: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },

        // Thermal animations (already defined in CSS, but adding here for consistency)
        thermalPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        thermalWave: {
          '0%, 100%': { transform: 'translateX(0) scaleX(1)' },
          '25%': { transform: 'translateX(10px) scaleX(1.1)' },
          '50%': { transform: 'translateX(0) scaleX(1)' },
          '75%': { transform: 'translateX(-10px) scaleX(1.1)' },
        },
        thermalGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 106, 61, 0.3)' },
          '50%': {
            boxShadow: '0 0 40px rgba(255, 106, 61, 0.6), 0 0 60px rgba(255, 61, 158, 0.3)',
          },
        },
        thermalFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(2deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        thermalScan: {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%) skewX(-12deg)', opacity: '0' },
        },
        thermalReveal: {
          '0%': { filter: 'grayscale(100%) contrast(0.5)', transform: 'scale(0.95)' },
          '100%': { filter: 'grayscale(0%) contrast(1)', transform: 'scale(1)' },
        },

        // Special effects
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
      },
      transitionDelay: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
      },
    },
  },
  plugins: [],
}

export default config
