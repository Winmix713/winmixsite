import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // Winmix brand colors
        "winmix-blue": {
          DEFAULT: "#1EAEDB",
          50: "#E9F7FC",
          100: "#C5EAF6",
          200: "#9DDCF0",
          300: "#74CEEA",
          400: "#4CC0E3",
          500: "#1EAEDB",
          600: "#189BC3",
          700: "#1387AB",
          800: "#0E7493", 
          900: "#095E7B",
        },
        "winmix-purple": {
          DEFAULT: "#9B87F5",
          50: "#F5F3FE",
          100: "#E5DEFF",
          200: "#D0C3FB",
          300: "#BBA8F8",
          400: "#AB98F6",
          500: "#9B87F5",
          600: "#7A61F1",
          700: "#593AEE",
          800: "#3414DF",
          900: "#2A10B6",
        },
        
        // Content background levels
        "content-1": "hsl(var(--content-1))",
        "content-2": "hsl(var(--content-2))", 
        "content-3": "hsl(var(--content-3))",
        "content-4": "hsl(var(--content-4))",
        
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'scale-out': {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0.95)', opacity: '0' }
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'scale-out': 'scale-out 0.2s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-out-right': 'slide-out-right 0.3s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'enter': 'fade-in 0.3s ease-out, scale-in 0.2s ease-out',
        'exit': 'fade-out 0.3s ease-out, scale-out 0.2s ease-out'
      },
      backgroundImage: {
        'noise-pattern': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      // Glass UI utilities
      addUtilities({
        '.glass-card': {
          '@apply backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg': {}
        },
        '.glass-card-hover': {
          '@apply hover:bg-white/20 transition-all duration-300': {}
        },
        '.glass-card-dark': {
          '@apply backdrop-blur-xl bg-black/40 border border-white/10': {}
        },
        '.neo-blur': {
          '@apply backdrop-blur-2xl bg-black/40 border border-white/10': {}
        },
        '.text-gradient': {
          '@apply bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent': {}
        },
        '.text-gradient-primary': {
          '@apply bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent': {}
        },
        '.glow': {
          '@apply relative': {},
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '-1px',
            background: 'linear-gradient(45deg, hsl(var(--primary)/30%), transparent, hsl(var(--primary)/30%))',
            borderRadius: 'inherit',
            zIndex: '-1',
          }
        },
        '.glow-blue': {
          '&::before': {
            background: 'linear-gradient(45deg, rgba(30,174,219,0.3), transparent, rgba(30,174,219,0.3))',
          }
        },
        '.glow-purple': {
          '&::before': {
            background: 'linear-gradient(45deg, rgba(155,135,245,0.3), transparent, rgba(155,135,245,0.3))',
          }
        },
      })
    }
  ],
} satisfies Config;
