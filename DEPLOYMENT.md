# Deployment Guide for Lost in Space Maze

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file:
```bash
NEXT_PUBLIC_ROOT_URL=https://yourdomain.com
```

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variable: `NEXT_PUBLIC_ROOT_URL`
5. Deploy!

### Option 2: Deploy via CLI
```bash
npm i -g vercel
vercel
```

## 🔗 Farcaster Integration

### Step 1: Deploy Your App
Deploy to Vercel or your hosting provider and get your production URL.

### Step 2: Update Manifest
1. Update `public/.well-known/farcaster.json`:
   - Replace all `https://yourdomain.com` with your actual domain
   - Ensure all URLs are absolute (https://)

2. Update `app/layout.tsx`:
   - Set `ROOT_URL` environment variable or hardcode your domain

### Step 3: Generate Account Association
1. Go to [Base Build Account Association Tool](https://www.base.dev/preview?tab=account)
2. Paste your domain in the `App URL` field
3. Click "Submit" and then "Verify"
4. Copy the `accountAssociation` object
5. Paste it into `public/.well-known/farcaster.json`

### Step 4: Verify Deployment
1. Ensure `/.well-known/farcaster.json` is accessible at:
   `https://yourdomain.com/.well-known/farcaster.json`
2. Test with [Farcaster Embed Tool](https://farcaster.xyz/~/developers/mini-apps/embed)
3. Preview with [Base.dev Preview](https://base.dev/preview)

## ✅ Checklist Before Publishing

- [ ] All URLs in `farcaster.json` are absolute (https://)
- [ ] `accountAssociation` is filled in `farcaster.json`
- [ ] `NEXT_PUBLIC_ROOT_URL` is set correctly
- [ ] App icon (1024x1024) is in `public/icon.png`
- [ ] Hero image (1200x630) is in `public/hero-image.png`
- [ ] Screenshots are in `public/` (optional but recommended)
- [ ] Webhook endpoint is accessible at `/api/webhook`
- [ ] App loads in < 3 seconds
- [ ] Touch controls work on mobile
- [ ] Game runs at 60 FPS

## 🎮 Testing

### Local Testing
```bash
npm run dev
```

### Production Build Test
```bash
npm run build
npm start
```

### Mobile Testing
- Use Chrome DevTools device emulation
- Test on actual mobile device
- Verify touch/swipe controls
- Check performance (60 FPS target)

## 📱 Base.app Requirements

According to [Base Featured Guidelines](https://docs.base.org/mini-apps/featured-guidelines/overview):

- ✅ App loads within 3 seconds
- ✅ In-app actions complete within 1 second
- ✅ Touch targets are minimum 44px
- ✅ Supports light and dark modes (dark mode implemented)
- ✅ App icon is 1024×1024 px, PNG, no transparency
- ✅ Hero image is high quality, 1200×630px
- ✅ Screenshots highlight key functionality

## 🐛 Troubleshooting

### Issue: Farcaster embed shows error
- Check that `/.well-known/farcaster.json` is accessible
- Verify all URLs are absolute (https://)
- Ensure `version` is `"1"` not `"next"`
- Ensure `action.type` is `"launch_frame"`

### Issue: Game doesn't load
- Check browser console for errors
- Verify all dependencies are installed
- Check that `FarcasterReady` component is in layout

### Issue: Controls don't work
- Check that `useControls` hook is enabled when game is playing
- Verify touch events aren't being blocked
- Test on actual device, not just emulator

## 📚 Resources

- [Base Mini Apps Docs](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
- [Farcaster Mini App Spec](https://miniapps.farcaster.xyz/docs/specification)
- [Base Featured Guidelines](https://docs.base.org/mini-apps/featured-guidelines/overview)
