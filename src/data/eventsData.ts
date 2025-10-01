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

