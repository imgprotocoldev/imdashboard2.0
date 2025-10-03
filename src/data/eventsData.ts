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
    id: "e16",
    slug: "alphai-listing",
    title: "Alph.ai Listing",
    category: "featured",
    date: new Date("2025-08-20T00:00:00.000Z").toISOString(),
    image: "/images/events/alphailistingbanner.webp",
    excerpt:
      "$IMG is now live on Alph.AI with $IMG/SOL trading! Hosting a special event for the First-Time Trade & Trading Volume Challenge! Event: Aug 20 – 27, 2025 (UTC+7).",
    content: `## Alph.AI X Img: Free Trading Fee Event

Event Period
10/09/2025–27/09/2025

Eligible Participants
All registered users on Alph AI are eligible to join.

Trading Fee Waiver Details
0% trading fees apply only for buy and sell transactions of $IMG token during the event period.

The fee waiver does not apply to:

- Withdrawals
- Deposits
- Trades involving other tokens

Standard trading rules and limits remain in effect.

How to Participate
1. Log in to your Alph AI account.
2. Trade $IMG during the event period to enjoy free trading fees.

CA : znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh

Event Rules
- Only trades of $IMG are eligible.
- Users must comply with Alph AI's Terms of Service.

Reward Distribution
- Rewards come in the form of 0% trading fees, applied instantly during execution of eligible trades.
- No manual claim required.
- Users can verify fee discounts in their Alph AI trade history.

Disclaimer — Free Trading Fee Event
- Alph AI reserves the right to modify, suspend, or cancel the event at any time without prior notice.
- Any form of fraudulent activity, market manipulation, or abuse of the system will result in disqualification.
- Cryptocurrency trading involves high risks, including price volatility and possible capital loss. Participants should conduct their own research before trading.
- Alph AI does not provide financial, investment, or trading advice. Participation in this event does not guarantee profit or risk-free trading.

Contact & Support
For any questions or assistance regarding the Alph AI Event, please reach out to Alph AI's official support team via:

- Telegram: [https://t.me/AlphAICommunity](https://t.me/AlphAICommunity)
- Twitter (X): [https://x.com/alphai_snipe](https://x.com/alphai_snipe)

Event ended and winners were selected on the Alph.AI Exchange!`,
    author: {
      name: "IMG Team",
      avatar: "/images/logo/imglogoround.webp",
    },
    tags: ["Featured", "Alph.AI", "Listing", "Trading"],
    popularity: 5,
  },
  {
    id: "e15",
    slug: "bitrue-listing",
    title: "Bitrue Listing",
    category: "featured",
    date: new Date("2025-08-20T00:00:00.000Z").toISOString(),
    image: "/images/events/bitruelisting.webp",
    excerpt:
      "$IMG is now listed on Bitrue! Trade/USDT directly at bitrue.com. To celebrate, Bitrue is hosting a trading competition with a $2,000 USDT prize pool. Event runs from Aug 20 – 27, 2025 (UTC+7).",
    content: `## #️⃣ Event Period
20 August 2025, 00:00 UTC+7 – 27 August 2025, 23:59 UTC+7

🎯 Airdrop activities are exclusively available on Bitrue Alpha App!

## #️⃣ Event Prizes

Total $2,000 USDT Prize Pool

- Top 10 Traders
- 10 Lucky Draw Winners: $10 USDT each ($100 total)
- Trading Volume Share Pool: $1,400 USDT distributed proportionally to qualified participants

## #️⃣ Event Details

**Activity 1: Top 10 Traders**

Trade $IMG/USDT on Bitrue Alpha during the event. The Top 10 traders with the highest trading volume (buy + sell) will be rewarded.

**Activity 2: Lucky Draw Winners**

10 random eligible traders will win $10 USDT each.

**Activity 3: Volume Share Pool**

The remaining $1,400 USDT will be shared proportionally among all qualified participants based on their $IMG/USDT trading volume.

## #️⃣ Reward Distribution

- Rewards will be distributed within 14 working days after the campaign ends.
- Winners will be announced via Bitrue Official Telegram

## #️⃣ Terms & Conditions

- Participants must have a Bitrue Alpha account and complete KYC verification.
- Only trades of $IMG/USDT (Alpha) count towards rankings.
- Fake trading, wash trading, use of bots, or multiple accounts will result in disqualification.
- Bitrue Alpha reserves the right to suspend the campaign if misuse or suspicious activity is detected.
- Decisions made by Bitrue are final and cannot be contested.

## #️⃣ Disclaimer

Bitrue reserves the right in its sole discretion to amend, modify, or cancel this campaign at any time without prior notice. Cryptocurrency trading is highly volatile and involves risk of loss. Please invest responsibly. For more details, see [Competition details](https://www.bitrue.com/land/img) and our [Terms of Use and Privacy Policy](https://support.bitrue.com/hc/en-001/articles/4405473185945-Bitrue-Privacy-Policy).

Event ended and winners were selected on the Bitrue Exchange!`,
    author: {
      name: "IMG Team",
      avatar: "/images/logo/imglogoround.webp",
    },
    tags: ["Featured", "Bitrue", "Listing", "Trading"],
    popularity: 10,
  },
  {
    id: "e14",
    slug: "coingecko-update",
    title: "CoinGecko Update",
    category: "featured",
    date: new Date("2025-08-28T00:00:00.000Z").toISOString(),
    image: "/images/events/trackimgcoingecko.webp",
    excerpt:
      "The team has submitted a request to CoinGecko for Infinite Money Glitch ($IMG) and is working with their support to gain full ownership of the listing, including updating information and social links.",
    content: `## CoinGecko Update - $IMG Listing

We're excited to announce that our CoinGecko listing for Infinite Money Glitch ($IMG) has been successfully updated! 

The team has gained full ownership and control of the listing, which means all token information, social links, and project details are now fully up to date and managed directly by us.

Check it out here: [CoinGecko – Infinite Money Glitch](https://www.coingecko.com/en/coins/infinite-money-glitch)

This marks another important step in strengthening our presence across major platforms and ensuring transparency for the $IMG community.`,
    author: {
      name: "IMG Team",
      avatar: "/images/logo/imglogoround.webp",
    },
    tags: ["Featured", "CoinGecko", "Listing"],
    popularity: 15,
  },
  {
    id: "e13",
    slug: "img-giveaway-august-28-2025",
    title: "IMG Giveaway – August 28, 2025",
    category: "featured",
    date: new Date("2025-08-28T00:00:00.000Z").toISOString(),
    image: "/images/events/giveawayAugust 2025.webp",
    excerpt:
      "The Buy Competition Giveaway went live and the community showed up strong! This event gave everyone a chance to win big while supporting $IMG.",
    content: `## Giveaway Details

📅 Date: August 28, 2025
🏆 Prizes:

- 50,000 $IMG → Biggest Buy Winner
- 2x 25,000 $IMG → Raffle Winners

Every $25 buy counted as one entry, and all participants needed to hold at least 5,000 $IMG to qualify.

## Results

✅ Winners were selected and officially announced in our Telegram community.

Winners have been selected and announced in our Telegram community. Congratulations to everyone who participated.`,
    author: {
      name: "IMG Team",
      avatar: "/images/logo/imglogoround.webp",
    },
    tags: ["Featured", "Giveaway", "Competition"],
    popularity: 20,
  },
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
    popularity: 50,
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
    popularity: 70,
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
    popularity: 80,
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
    popularity: 80,
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
    popularity: 100,
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
    popularity: 90,
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

