# IMG Protocol Dashboard

This is an integrated dashboard that merges the IMG Protocol financial services platform with the TailAdmin template repository. The new dashboard combines:

- **IMG Protocol Dashboard functionality** - Financial terminals, wallet integration, premium features
- **TailAdmin Template framework** - Modern React dashboard UI and foundation
- **Solana Wallet Integration** - Secure crypto wallet connections
- **Premium Feature Access** - Token-based premium functionality

## Features

### 🚀 Dashboard Pages
- **Terminal** - Primary dashboard interface
- **Events** - Calendar and financial events
- **Harvesting** - Premium tokening features (requires 50k IMG)
- **Distribution** - Daily distribution analytics (Premium)
- **Pools** - Liquidity pool management (Premium)
- **Rewards** - Rewards calculator & distribution (Premium)

### 💰 Premium Features
- Requires wallet connection with 50,000+ IMG tokens
- Unlocks premium charts and analytics
- Advanced distribution tracking
- Pool metrics and rewards calculator

### 🔧 Wallet Integration
- **Solana Compatible** - Phantom, Solflare wallet support
- **Instant Recognition** - Automatic premium status detection
- **Secure Storage** - Local storage for wallet state
- **Connection Management** - Easy wallet connect/disconnect

## Development

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```

### Navigation Structure
- Non-premium users see locked features with "🔒 Premium" indicators
- Premium users get full access to all dashboard sections
- Sidebar adapts based on premium status

## Safe Implementation

This dashboard is built with security in mind:

- ✅ **Template Sanitization** - Only safe components used from TailAdmin
- ✅ **No External Dependencies** - All template assets are controlled
- ✅ **Solo Protocol Integration** - Clean IMG Protocol functionality
- ✅ **No Malicious Files** - All organization verify assets and imports

## Project Structure

```
integrated-dashboard/
├── src/
│   ├── pages/           # Main dashboard pages
│   ├── layout/          # Dashboard layout components
│   ├── components/      # UI components
│   └── context/         # Global state management
├── public/
│   └── images/          # IMG Protocol assets
└── package.json         # Dependencies updated for IMG Protocol
```

## Integration Benefits

1. **Modern React Framework** - Built on TailAdmin's solid foundation
2. **Professional UI** - Clean dashboard interface ready for production
3. **Wallet Integration** - Built-in Solana support
4. **Mobile Responsive** - Designed for all screen sizes
5. **TypeScript Support** - Full type safety for development

## Next Steps

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Connect wallet for premium features
4. Configure production deployment as needed

The merged dashboard preserves all IMG Protocol functionality while gaining the professional appearance and development foundation of the TailAdmin template.