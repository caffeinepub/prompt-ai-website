import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            fontFamily: {
                sans: ['Outfit', 'system-ui', 'sans-serif'],
                display: ['Playfair Display', 'Georgia', 'serif'],
            },
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                },
                rose: {
                    blush: 'oklch(0.72 0.13 15)',
                    deep: 'oklch(0.62 0.14 12)',
                    soft: 'oklch(0.82 0.08 15)',
                    muted: 'oklch(0.55 0.10 12)',
                },
                warm: {
                    charcoal: 'oklch(0.16 0.010 45)',
                    dark: 'oklch(0.20 0.012 45)',
                    mid: 'oklch(0.26 0.014 45)',
                    light: 'oklch(0.35 0.015 45)',
                    cream: 'oklch(0.93 0.010 55)',
                    offwhite: 'oklch(0.96 0.008 60)',
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                xl: 'calc(var(--radius) + 4px)',
                '2xl': 'calc(var(--radius) + 8px)',
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                glow: '0 0 24px oklch(0.72 0.13 15 / 0.2)',
                'glow-sm': '0 0 12px oklch(0.72 0.13 15 / 0.15)',
                'warm-lg': '0 8px 32px oklch(0 0 0 / 0.4)',
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
                'fade-in-up': {
                    from: { opacity: '0', transform: 'translateY(8px)' },
                    to: { opacity: '1', transform: 'translateY(0)' }
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' }
                },
                'typing': {
                    '0%, 60%, 100%': { transform: 'translateY(0)' },
                    '30%': { transform: 'translateY(-4px)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in-up': 'fade-in-up 0.3s ease-out',
                'pulse-soft': 'pulse-soft 1.5s ease-in-out infinite',
                'typing-1': 'typing 1.2s ease-in-out infinite 0s',
                'typing-2': 'typing 1.2s ease-in-out infinite 0.2s',
                'typing-3': 'typing 1.2s ease-in-out infinite 0.4s',
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
