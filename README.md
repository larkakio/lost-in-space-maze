# Lost in Space Maze

A futuristic space-themed maze navigation game built as a Mini App for Base.app and Farcaster.

## 🎮 Game Overview

Navigate through procedurally generated neon mazes to reach the golden planet. Features touch controls, smooth animations, and a cyberpunk space aesthetic.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set environment variables:
```bash
NEXT_PUBLIC_ROOT_URL=https://yourdomain.com
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🎯 Features

- **Procedural Maze Generation**: Each level is uniquely generated using recursive backtracking
- **Touch & Keyboard Controls**: Swipe gestures for mobile, arrow keys/WASD for desktop
- **Progressive Difficulty**: Four difficulty levels (Easy, Medium, Hard, Expert)
- **Score System**: Track your high scores and level progress
- **Farcaster Integration**: Full Mini App support for Base.app
- **Responsive Design**: Mobile-first design with 60 FPS gameplay

## 🔧 Configuration

### Farcaster Manifest

Update `public/.well-known/farcaster.json` with your domain and account association credentials.

### Base.app Integration

1. Deploy to Vercel or your hosting provider
2. Update `NEXT_PUBLIC_ROOT_URL` with your production URL
3. Generate account association at [Base Build](https://www.base.dev/preview?tab=account)
4. Update the `accountAssociation` object in `farcaster.json`

## 📱 Mobile Optimization

- Minimum touch targets: 44x44px
- Swipe gesture controls
- Optimized for 60 FPS
- Load time < 3 seconds

## 🎨 Design System

- **Colors**: Neon green, cyan, pink, yellow on dark space background
- **Fonts**: Orbitron, Audiowide, Exo 2, Rajdhani
- **Effects**: Glow effects, particle backgrounds, glassmorphism

## 📄 License

MIT

## 🙏 Acknowledgments

Built for Base.app and Farcaster Mini Apps platform.
