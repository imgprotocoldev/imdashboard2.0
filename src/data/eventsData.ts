export type EventItem = {
  id: string;
  slug: string;
  title: string;
  category: "upcoming" | "featured" | "updates";
  date: string; // ISO
  image: string;
  excerpt: string; // Short description for grid
  content: string; // Full blog post content
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  popularity: number;
};

export const eventsData: EventItem[] = [
  {
    id: "e12",
    slug: "biggest-buy-competition",
    title: "Biggest Buy Competition!",
    category: "featured",
    date: new Date("2025-08-26T00:00:00.000Z").toISOString(),
    image: "/images/events/biggestbuycompetition1.webp",
    excerpt:
      "We're turning up the heat with a new weekly contest format! Instead of short 3-day events, the $IMG community will now enjoy a full week of competition and rewards.",
    content: `## Competition Details

📅 Duration: August 26 – September 2 (ending Tuesday, 12:30 PM EST)
💰 Prizes:

- Biggest Buy → Wins 50,000 IMG
- $25+ Buy Contest → 2 lucky winners of 25,000 IMG each

## Rules

- The biggest single buy during the competition wins the top prize.
- Any purchase of $25 or more automatically enters you into the raffle for 25,000 IMG.
- Selling before the competition ends will disqualify your entry.

More time, more winners, more fun. Join the competition and good luck, IMG holders!

Competition Ended
This competition has now ended. Winners were announced in our official Telegram. Congratulations to everyone who participated and supported $IMG!`,
    author: {
      name: "IMG Team",
      avatar: "/images/logo/imglogoround.webp",
    },
    tags: ["Featured", "Competition", "Rewards"],
    popularity: 95,
  },
  {
    id: "e11",
    slug: "temporary-tax-structure",
    title: "Temporary Tax structure",
    category: "updates",
    date: new Date("2025-09-15T00:00:00.000Z").toISOString(),
    image: "/images/events/temporarytax.webp",
    excerpt:
      "The $IMG community voted in favor of a temporary tax adjustment to strengthen the project during these early stages of growth. The new structure allocates 2.5% to the Infra Wallet and 2.5% to holders. This flexible system is designed to support ongoing development while ensuring long-term sustainability for the project.",
    content: `## Why a Temporary Tax Structure?

At lower market caps, even small trading volumes can make it difficult to fund critical development, marketing, and infrastructure. To solve this, the community voted to temporarily adjust the tax split:

- Holders: 2.5%
- Infra Wallet: 2.5%

This ensures that while holders still earn significant $SOL rewards, a larger share goes into the Infra Wallet, funding essential upgrades and growth strategies that benefit everyone long-term.

## How the Infra Wallet Builds Value

The Infra Wallet is the project's backbone. It has already been used to:

✅ Build new liquidity pools like IMG/BONK and IMG/USDC, generating more trading volume.

✅ Fund marketing campaigns to attract new holders.

✅ Pay for development upgrades, including improvements to the rewards script.

✅ Sponsor events and promotions to grow visibility.

This reinvestment creates a positive feedback loop: stronger infrastructure → more volume → more tax collected → more rewards and growth.

## Liquidity Pools = Volume Engine

One of the biggest benefits of boosting the Infra Wallet has been the ability to launch new trading pairs.

- IMG/BONK Pool ($5K) → generates $7,500–$30,000 daily volume.
- IMG/ETH Pool ($5K) → attracts ETH whales, adds $5,000–$20,000 daily volume.
- IMG/USDC Pool ($10K) → provides routing backbone for CEX/DEX arbitrage.

As more pools are added, arbitrage bots trade nonstop between them, driving consistent daily volume and tax revenue. This directly benefits holders by:

🔹 Increasing trading activity & visibility.

🔹 Lowering slippage → better experience for traders.

🔹 Generating higher tax income → more rewards + more funds for growth.

Even small pools ($2K–$5K) can generate 5x–10x their size in daily volume.

## Flexible Tax Based on Marketcap

After another community vote, we introduced a flexible tax model that adjusts as the project grows:

- Under $3M Marketcap → 2.5% holders / 2.5% infra wallet
- $3M–$5M → 3% holders / 2% infra wallet
- $5M–$7.5M → 3.5% holders / 1.5% infra wallet
- $7.5M–$10M → 4% holders / 1% infra wallet
- $10M+ → 4.5% holders / 0.5% infra wallet

This approach ensures:

✅ Strong funding when the project is small and needs it most.

✅ Gradual return to normal rewards as marketcap grows.

✅ Long-term sustainability, with the Infra Wallet always receiving 0.5% at $10M+ to keep development funded forever.

## The Bigger Picture

This flexible tax structure is temporary and designed for sustainability. As marketcap grows, rewards gradually shift back toward holders while still maintaining a small but steady Infra Wallet allocation to fund development.

Bottom line:

📌 Temporary boost to build stronger foundations.

📌 Flexible system that adapts to market growth.

📌 Self-sustaining model at scale with 0.5% Infra Wallet.

With this strategy, $IMG is building a sustainable reward ecosystem that grows alongside its holders — creating value today, and ensuring development for tomorrow.`,
    author: {
      name: "IMG Team",
      avatar: "/images/logo/imglogoround.webp",
    },
    tags: ["Update", "Tax", "Structure"],
    popularity: 89,
  },
  {
    id: "e10",
    slug: "server-optimization-upgrade",
    title: "Server Optimization Upgrade",
    category: "updates",
    date: new Date("2025-09-04T00:00:00.000Z").toISOString(),
    image: "/images/events/serverOptimizationevent.webp",
    excerpt:
      "The server has been upgraded to improve stability and support the growing database. Next milestone: optimizing the database to reduce bandwidth and memory usage. Auditing tools are also in development to strengthen reliability.",
    content: `Server Optimization Upgrade: Stronger, Smarter, More Reliable

The $IMG infrastructure has received a major server upgrade to improve stability, handle the growing database, and ensure the reward system remains reliable as the project scales.

## Why the Upgrade Was Needed

The rewards system has already processed over 13,099 transactions. With such growth, the database reached 12 million records, which began slowing down queries and affecting efficiency. On top of that, some unaccounted transactions appeared due to Solana API issues, requiring deeper auditing.

To handle this scale, the server was upgraded to meet memory and bandwidth requirements — ensuring smoother operation for both the rewards script and the dashboard.

## What's Being Worked On

- Reconcile Phase – A new step in the rewards process will verify wallet balances against expected values, eliminating mismatches and improving accuracy.
- Spam Airdrop Filtering – A script is being built to identify and remove spam airdrops from transaction history, keeping records clean.
- Accrual Distribution System – An "add-on" script in development will automatically track and re-distribute any skipped or pending rewards, so no holder is left behind.

## Rewards Flow (New & Improved)

The upgraded process will now follow four phases:

1. Harvest – Collect IMG fees.
2. Allocation – Convert to SOL.
3. Distribution – Pay rewards to holders.
4. Reconcile – Confirm balances match on-chain expectations.

## Why This Matters for Holders

- Stronger reliability → fewer missed transactions, smoother rewards.
- Better accuracy → every SOL accounted for, no holder overlooked.
- Future-proof scaling → optimized database ensures the system can keep growing.
- Community trust → full transparency and clean execution, all verifiable on-chain.

This upgrade ensures $IMG continues to build a sustainable, resilient, and transparent rewards ecosystem, benefitting every single holder.

Next milestone: optimizing the database further to reduce bandwidth and memory usage — paving the way for seamless growth.`,
    author: {
      name: "IMG Team",
      avatar: "/images/logo/imglogoround.webp",
    },
    tags: ["Update", "Server", "Optimization"],
    popularity: 87,
  },
  {
    id: "e9",
    slug: "reward-system-upgrade",
    title: "Reward system upgrade",
    category: "updates",
    date: new Date("2025-08-20T00:00:00.000Z").toISOString(),
    image: "/images/events/solrewardsevents.webp",
    excerpt:
      "Rewards are harvested hourly and distributed daily at 2 AM, 8 AM, 2 PM, and 8 PM EST. Payouts roll out gradually, so while not every wallet receives rewards at those exact times, all holders receive their full share by day's end, execution is on-chain and verifiable.",
    content: `Reward System Upgrade: Smarter, Fairer, Stronger

The $IMG reward system has been upgraded to provide more efficient payouts, lower fees, and a smoother experience for all holders.

This upgrade was decided by community vote on Telegram — a true community-led step forward.

## Why the Change?

Previously, rewards were distributed every 5 minutes. While fast, this method caused:

- Unnecessary transaction fees piling up
- Higher risk of Solana blockchain congestion during peak activity
- Frequent small reward transfers that weren't efficient for holders

To solve this, the system now uses a fixed distribution schedule four times daily.

## How It Works Now

- Harvesting: Rewards are harvested hourly, with $IMG fees converted to $SOL in small batches (avoiding large sell-offs).
- Distribution: Rewards are paid out at 2 AM, 8 AM, 2 PM, and 8 PM EST.
- Rolling Payouts: Not every wallet receives SOL at the exact times, but all holders get their full rewards by day's end.
- On-Chain Transparency: Every step is executed and verifiable directly on-chain.

## Why This is Better for Holders

- Bigger, juicier payouts (4 times daily vs. tiny amounts every 5 minutes)
- Lower transaction costs → more value stays in the system
- Less stress on Solana → smoother and more reliable reward flow
- Smarter harvesting → IMG converted to SOL gradually, not in large dumps

## Designed for the Community

This upgrade balances efficiency and fairness, ensuring rewards are distributed in a way that strengthens $IMG's long-term sustainability while maximizing value for holders.

The result: smoother operations, fewer fees, and stronger rewards — all decided by the community.`,
    author: {
      name: "IMG Team",
      avatar: "/images/logo/imglogoround.webp",
    },
    tags: ["Update", "Rewards", "System"],
    popularity: 88,
  },
  {
    id: "e8",
    slug: "blacklist-wallets",
    title: "Blacklist Wallets",
    category: "updates",
    date: new Date("2025-08-11T00:00:00.000Z").toISOString(),
    image: "/images/events/blackwalletsevents.webp",
    excerpt:
      "The Rewards script now blacklists several wallets, including CoinEx hot wallet, Raydium, Phantom, and others that were unfairly collecting fees and rewards. This update protects the project ensuring fairer distribution and increased earnings for real $IMG holders.",
    content: `Blacklist Wallets: A Major Upgrade for Fair Rewards

We're excited to introduce an important upgrade to the $IMG reward system: Blacklist Wallets.

This system ensures that rewards are distributed fairly by excluding wallets that should not be receiving them, such as DEX liquidity pools, exchange hot wallets, and fee wallets. Instead of rewards being wasted on inactive or platform-controlled wallets, they are redirected to real $IMG holders.

## What Are Blacklist Wallets?

The rewards script now automatically blacklists certain addresses, including:

- CoinEx hot wallet
- Raydium liquidity pools
- Phantom fee wallet
- And other similar exchange-related wallets

By excluding these wallets, the system prevents rewards from being sent to places where they provide no benefit to the community.

## How It Helps Holders

- Rewards are distributed only among true $IMG holders
- Prevents wasted payouts to liquidity pools and exchanges
- Increases individual rewards by narrowing the eligible pool of recipients

This means more SOL is sent directly to wallets that actually hold $IMG, strengthening the fairness and value of the ecosystem.

## How It Works (On-Chain & Transparent)

The rewards script fully automates the process:

- Scans the blockchain for wallet balances
- Harvests rewards
- Converts IMG tax into SOL
- Distributes SOL to all eligible (non-blacklisted) holders

All steps are executed on-chain and can be verified publicly.

## A Flexible & Evolving System

Blacklist Wallets is not static — the system can add or remove addresses as needed. As the project grows, more exchange or platform wallets may be blacklisted to ensure rewards always benefit the community first.

## Why This Matters

This update marks a big step toward making the reward system more efficient, fair, and sustainable. It ensures that $IMG continues to deliver maximum value to holders, rather than rewarding inactive or platform-controlled addresses.

With this upgrade, $IMG proves once again that it is committed to innovation, transparency, and community-first development.`,
    author: {
      name: "IMG Team",
      avatar: "/images/logo/imglogoround.webp",
    },
    tags: ["Update", "Rewards", "Blacklist"],
    popularity: 85,
  },
  {
    id: "e7",
    slug: "img-new-developer",
    title: "IMG New Developer",
    category: "updates",
    date: new Date("2025-08-12T00:00:00.000Z").toISOString(),
    image: "/images/events/imgnewdeveloper.webp",
    excerpt:
      "We're excited to welcome Jerry Balderas as our new developer! With 12+ years of full-stack experience, he's focused on building a high-performance rewards script and tax-optimized systems to strengthen $IMG and deliver long-term value for the community.",
    content: `We're thrilled to announce that Jerry Balderas has officially joined the $IMG development team! With more than 12 years of full-stack engineering and tech lead experience, Jerry brings the expertise and vision needed to take $IMG's infrastructure, rewards system, and long-term sustainability to the next level.

## GitHub – Jerry Balderas

[@https://github.com/midnjerry](https://github.com/midnjerry)

## Jerry's Mission at $IMG

Jerry's primary focus will be on:
- Building a high-performance, redundant rewards distribution script
- Creating tax-optimized systems to maximize long-term project value
- Strengthening the technical foundation for $IMG's growth

He has previously developed trading platforms with advanced backtesting and even a real-time auditing prototype: IMG Audit Demo

## From Jerry Himself:

"First and foremost, thank you all for your recommendation. I've been praying long and hard and although it's a great responsibility, I am honored and excited to step in.

My goal with the distribution script is obviously high-redundancy performance, but I'm looking at this as a marathon. I'm currently in the process of setting up tax vehicles to incorporate a Self-Directed IRA (SDIRA) framework. Imagine an auto-compounding trading engine (with no capital gains) which doubles every year, but also takes profits and buys $IMG.

Not only am I bringing maintenance, but I'm also building a framework that will create a tax-optimized revenue stream for consistent $IMG buybacks. This is a marathon, and if we stay the course, we will bless many people."*

## Why This Is Big for $IMG

Jerry isn't just maintaining and upgrading the system — he's helping $IMG evolve into a self-sustaining ecosystem.

✅ Stronger, more reliable distribution mechanics
✅ New tax-optimized structures to support buybacks
✅ A forward-looking strategy for scalability and growth

With Jerry onboard, $IMG is doubling down on long-term development, transparency, and innovation. This marks a huge step forward in ensuring $IMG remains one of the most sustainable and community-driven projects in crypto.`,
    author: {
      name: "IMG Team",
      avatar: "/images/logo/imglogoround.webp",
    },
    tags: ["Update", "Developer", "Team"],
    popularity: 90,
  },
  {
    id: "e6",
    slug: "infra-wallet-0-5",
    title: "Infra Wallet",
    category: "updates",
    date: new Date("2025-08-04T00:00:00.000Z").toISOString(),
    image: "/images/events/imgvault-infra0.5.webp",
    excerpt:
      "The Infra Wallet collects 0.5% from every buy, sell, and transfer (from the 5% tax). These funds are dedicated to strengthening the project, fueling marketing, growth, and future development while creating lasting value for the entire $IMG community.",
    content: `The $IMG community has spoken! By majority vote on our official Telegram, the community decided to introduce an Infrastructure Wallet (Infra Wallet) a transparent, on-chain solution designed to strengthen the project and ensure long-term sustainability.

## What is the Infra Wallet?

The Infra Wallet collects 0.5% from every buy, sell, and transfer (out of the 5% transaction tax). These funds are fully transparent on-chain and can be tracked by anyone in the community.

Unlike hidden or centralized funding models, the Infra Wallet makes sure every token holder knows exactly where resources are going — creating trust and accountability at the heart of the $IMG ecosystem.

## Why It Matters

The purpose of the Infra Wallet is simple:
to fuel growth, strengthen infrastructure, and support ongoing development, making $IMG more sustainable in the long run.

Funds from the Infra Wallet are being used for:

- Infrastructure operations and upgrades
- Paid marketing campaigns & social promotions
- Updating Dexscreener and other tracking platforms
- Paying developers to improve the rewards script
- Third-party audits & CEX listing fees
- Launching new liquidity pools (IMG/BONK, IMG/USDC, and more)

Even several whales have contributed additional support, helping accelerate these efforts and expand the reach of $IMG.

## Community-Backed Rewards System

The Infra Wallet works hand-in-hand with the automatic Solana rewards system, another upgrade chosen directly by community vote.

Here’s how it works:

- 5% tax on all transactions
- 4.5% goes directly back to holders
- 0.5% goes to the Infra Wallet
- 100% of the collected tax is converted into Solana

Rewards are harvested hourly and distributed daily at 2 AM, 8 AM, 2 PM, and 8 PM EST

All execution is on-chain and verifiable — no claiming required
By combining automated Solana rewards with the Infra Wallet, $IMG achieves both immediate value for holders and long-term growth for the project.

## A Community-Led Future

The addition of the Infra Wallet shows exactly what makes $IMG different: every major decision is guided by the community.

With transparency, sustainability, and growth at its core, the Infra Wallet ensures $IMG is built to last.

This is only the beginning, with the Infra Wallet in place, $IMG is positioned to expand faster, scale smarter, and deliver even more value to its community.`,
    author: {
      name: "IMG Team",
      avatar: "/images/logo/imglogoround.webp",
    },
    tags: ["Update", "Infra", "Tax"],
    popularity: 80,
  },
  {
    id: "e1",
    slug: "img-v2-terminal-launch-webinar",
    title: "IMG v2 Terminal Launch Webinar",
    category: "featured",
    date: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    image: "/images/events/event1.webp",
    excerpt: "Walkthrough of the new terminal features and roadmap.",
    content: `We're excited to announce the launch of IMG v2 Terminal - a complete redesign of our distribution dashboard with powerful new features and improved user experience.

## What's New in v2

The new terminal brings a host of improvements designed to make managing your IMG rewards easier and more transparent:

### Enhanced Network Demographics
Get real-time insights into your validator network with our interactive world map showing user distribution across regions. The new demographics panel provides instant visibility into your global reach.

### Advanced Reward Tracking
Track reward conversions, distribution batches, and pending rewards all in one unified interface. Our new visualization tools make it easy to understand your reward flow at a glance.

### Improved Performance
Built from the ground up with modern React architecture, the terminal is faster and more responsive than ever. Real-time updates ensure you're always seeing the latest data.

## Join the Webinar

Don't miss this opportunity to get a guided tour of all the new features. We'll cover:

- How to navigate the new terminal interface
- Best practices for monitoring your distributions
- Tips and tricks for maximizing efficiency
- Q&A session with the development team

Register now to secure your spot!`,
    author: {
      name: "IMG Team",
      avatar: "/images/avatar/user1.webp",
    },
    tags: ["Terminal", "Launch", "Features"],
    popularity: 85,
  },
  {
    id: "e2",
    slug: "partnership-announcement",
    title: "Partnership Announcement",
    category: "updates",
    date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    image: "/images/events/event2.webp",
    excerpt: "Integrations to improve reward distribution pipeline.",
    content: `We're thrilled to announce a strategic partnership that will significantly enhance our reward distribution infrastructure and expand IMG Protocol's capabilities.

## Partnership Overview

This collaboration brings together industry-leading technology to create a more robust and efficient distribution pipeline. Our partners share our commitment to transparency and reliability.

### Key Benefits

**Enhanced Infrastructure**
- Improved transaction processing speeds
- Reduced distribution latency
- Better fault tolerance and reliability

**Expanded Capabilities**
- New integration options for validators
- Enhanced monitoring and analytics
- Streamlined onboarding process

**Cost Optimization**
- Lower transaction fees
- More efficient batch processing
- Optimized reward calculations

## What This Means for You

Validators and token holders can expect:

- Faster reward distributions
- Lower operational costs
- Better visibility into distribution status
- Enhanced security and reliability

## Timeline

The integration is already underway, with the first phase going live next month. Full rollout is expected within the quarter.

Stay tuned for more updates as we continue to build the future of decentralized reward distribution!`,
    author: {
      name: "IMG Team",
      avatar: "/images/avatar/user1.webp",
    },
    tags: ["Partnership", "Infrastructure", "Updates"],
    popularity: 60,
  },
  {
    id: "e3",
    slug: "community-ama",
    title: "Community AMA",
    category: "featured",
    date: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    image: "/images/events/event3.webp",
    excerpt: "Join the team to discuss IMG, SOL conversions, and plans.",
    content: `Join us for an interactive AMA (Ask Me Anything) session where the IMG Protocol team will answer your questions about our platform, future plans, and the broader Solana ecosystem.

## Event Details

**When:** Coming up this week
**Where:** Telegram Community Channel
**Duration:** 2 hours

## Topics We'll Cover

### Protocol Development
- Recent updates and improvements
- Upcoming features on the roadmap
- Technical architecture decisions

### Tokenomics & Rewards
- IMG to SOL conversion mechanisms
- Reward distribution strategies
- Validator economics

### Community & Governance
- How to get more involved
- Contribution opportunities
- Future governance plans

## How to Participate

1. Join our Telegram community
2. Submit your questions in advance or ask live
3. Engage with other community members

No question is too simple or too complex - we want to hear from everyone!

## Special Announcements

We'll also be sharing some exclusive updates during the AMA, including:

- New partnership reveals
- Product roadmap sneak peeks
- Community incentive programs

Mark your calendars and bring your questions. We're looking forward to connecting with our amazing community!

Join our Telegram to get notified when we go live.`,
    author: {
      name: "IMG Team",
      avatar: "/images/avatar/user1.webp",
    },
    tags: ["Community", "AMA", "Featured"],
    popularity: 95,
  },
  {
    id: "e4",
    slug: "quarterly-update-q4-2024",
    title: "Quarterly Update",
    category: "updates",
    date: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
    image: "/images/events/event4.webp",
    excerpt: "Metrics, releases, and next milestones.",
    content: `As we close out another successful quarter, we're excited to share our progress, key metrics, and what's ahead for IMG Protocol.

## Key Metrics

Our network continues to grow steadily:

**Network Growth**
- 40% increase in active validators
- 1,200+ total users across 25+ countries
- $2.5M+ in total rewards distributed

**Platform Performance**
- 99.9% uptime across all services
- Average distribution time: <5 minutes
- Zero critical incidents

## Major Releases

### Terminal v2
Launched our completely redesigned terminal with enhanced analytics, real-time monitoring, and improved UX. User feedback has been overwhelmingly positive.

### Mobile Optimization
Rolled out mobile-responsive designs across the entire platform, making it easier to monitor distributions on the go.

### API Enhancements
Released v2 of our public API with better documentation, new endpoints, and improved rate limits.

## What's Next

### Q1 2025 Roadmap

**Infrastructure Upgrades**
- Multi-sig wallet support
- Advanced batch scheduling
- Enhanced security protocols

**Feature Additions**
- Custom reward calculation rules
- Advanced reporting and exports
- Integration with major wallets

**Community Initiatives**
- Validator education program
- Expanded documentation
- Community governance beta

## Thank You

None of this would be possible without our incredible community of validators, token holders, and contributors. Your feedback drives our development, and your support keeps us motivated.

Here's to an even more successful quarter ahead!`,
    author: {
      name: "IMG Team",
      avatar: "/images/avatar/user1.webp",
    },
    tags: ["Update", "Metrics", "Roadmap"],
    popularity: 72,
  },
  {
    id: "e5",
    slug: "validator-ops-workshop",
    title: "Validator Ops Workshop",
    category: "featured",
    date: new Date(Date.now() + 21 * 24 * 3600 * 1000).toISOString(),
    image: "/images/events/event5.webp",
    excerpt: "Hands-on session for infra contributors and power users.",
    content: `Calling all validators and infrastructure enthusiasts! Join us for an in-depth, hands-on workshop covering everything you need to know about running validator operations on IMG Protocol.

## Workshop Overview

This technical workshop is designed for both new and experienced validators who want to optimize their operations and get the most out of the IMG ecosystem.

## What You'll Learn

### Setup & Configuration
- Step-by-step validator setup
- Best practices for node configuration
- Security hardening essentials

### Operations & Monitoring
- Using the Terminal dashboard effectively
- Setting up alerts and notifications
- Troubleshooting common issues

### Optimization Strategies
- Maximizing reward efficiency
- Resource allocation tips
- Performance tuning

### Advanced Topics
- Custom integration patterns
- API usage for automation
- Batch processing optimization

## Who Should Attend

- Current validators looking to optimize
- Infrastructure contributors
- Power users interested in validation
- Anyone curious about validator operations

## Workshop Format

**Duration:** 3 hours
**Format:** Live presentation + hands-on exercises
**Prerequisites:** Basic understanding of Solana validators

We'll have breakout sessions for different experience levels, so everyone can participate at their own pace.

## Materials Provided

All attendees will receive:
- Comprehensive setup guide
- Configuration templates
- Troubleshooting checklist
- Access to private support channel

## Register Now

Spaces are limited to ensure quality interaction. Register early to secure your spot!

Looking forward to seeing you there and helping you become a validator pro! 🚀`,
    author: {
      name: "IMG Team",
      avatar: "/images/avatar/user1.webp",
    },
    tags: ["Workshop", "Validators", "Technical"],
    popularity: 68,
  },
];

// Helper function to get event by slug
export const getEventBySlug = (slug: string): EventItem | undefined => {
  return eventsData.find(event => event.slug === slug);
};

// Helper function to get related events
export const getRelatedEvents = (currentSlug: string, limit: number = 3): EventItem[] => {
  const current = getEventBySlug(currentSlug);
  if (!current) return [];
  
  // Get events from same category, excluding current
  const relatedByCategory = eventsData
    .filter(e => e.slug !== currentSlug && e.category === current.category)
    .slice(0, limit);
  
  // If we need more, add popular ones
  if (relatedByCategory.length < limit) {
    const additional = eventsData
      .filter(e => e.slug !== currentSlug && !relatedByCategory.includes(e))
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit - relatedByCategory.length);
    
    return [...relatedByCategory, ...additional];
  }
  
  return relatedByCategory;
};

