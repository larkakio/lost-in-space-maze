import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neon colors
        'neon-green': '#00ff88',
        'neon-cyan': '#00ffff',
        'neon-pink': '#ff00ff',
        'neon-yellow': '#ffff00',
        
        // Space colors
        'space-dark': '#0a0e1a',
        'space-medium': '#1a1e2a',
        'space-light': '#2a2e3a',
        
        // Accent colors
        'glow-blue': '#00ffff',
        'glow-purple': '#8b5cf6',
        'warning-red': '#ff0055',
        'success-green': '#00ff88',
      },
      fontFamily: {
        'display': ['Orbitron', 'Audiowide', 'sans-serif'],
        'body': ['Exo 2', 'Rajdhani', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
          '50%': { textShadow: '0 0 30px currentColor, 0 0 50px currentColor' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
