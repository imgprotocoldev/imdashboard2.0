<div align="center">
  <img src="imglogo.png" alt="IMG Logo" width="200"/>
</div>

# Infinite Money Glitch Rewards Distribution Platform

A comprehensive rewards distribution system for the IMG token ecosystem, designed to automatically harvest fees, distribute rewards, and maintain transparent ledger records.

## Requirements

- **Harvests run every 1 hour**
- **Distributions run at 2AM, 8AM, 2PM, 8PM EST**

## Rewards Procedure

### 1. Gather all IMG related accounts
   - Filter accounts with withdrawn IMG
   - Filter blacklist - Calculate balances per owner

### 2. Harvest IMG
   - Collect accumulated fees from IMG token contracts

### 3. Swap IMG for SOL
   - Convert harvested IMG tokens to SOL for distribution

### 4. Calculate Infrastructure Wallet Payment (10%)
   - Allocate 10% of collected SOL to infrastructure wallet

### 5. Allocate SOL Rewards
   - Distribute remaining SOL based on owner balances

### 6. Update Rewards Ledger
   - **Requirements:**
     - Owner must hold at least 1 IMG
     - Owner must not be part of blacklist

### 7. Distribute Rewards
   - Distribute portion to Infrastructure Wallet
   - **Owner Requirements:**
     - Must not be part of blacklist
     - Must have 0.0002 SOL in wallet already (or failure)
     - Pending rewards should be >= MIN_REWARD
   - **Distribution Method:** Bundle transfers (20 addresses per transfer)

### 8. Reconcile Blockchain
   - Pull latest signatures and mark appropriately with TransactionType
   - Any extra signatures must be marked as SPAM_AIRDROP or flagged for evaluation
   - Update reward ledgers to track double-spending

## Database Schema

### Snapshot
The hourly "execution header" for the rewards pipeline - a single row that summarizes the run's timing, state, and roll-up totals.

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `executionWindowStart` | Timestamp | Unique rounded down to hour (protects from duplicate runs) |
| `startedAt` | Timestamp | Pipeline start time |
| `finishedAt` | Timestamp | Pipeline completion time |
| `status` | Enum | SnapshotStatus (PENDING/RUNNING/SUCCESS/FAILED/PARTIAL) |
| `currentStep` | Enum | SnapshotStep |
| `imgHarvested` | BigInteger | Total IMG fees withdrawn (lamports) |
| `solCollected` | BigInteger | Total SOL received from swaps (lamports) |
| `solCommissionToInfra` | BigInteger | SOL sent to infra wallet (lamports) |
| `solAllocatedRewards` | BigInteger | Sum of SOL allocated to holders (lamports) |

**Key Features:**
- `executionWindowStart` is a natural key (unique per hour) for idempotent operations
- All amount fields stored as BigInteger in base units (lamports)
- Never use floating point for financial calculations

### SnapshotEvent
Tracks the lifecycle of each hourly execution run.

**Lifecycle:** PENDING → RUNNING → SUCCESS/FAILED/PARTIAL

### Blacklist
Manages blocked wallet addresses.

| Field | Type | Description |
|-------|------|-------------|
| `owner` | String | Solana address |
| `label` | String | Reason for blacklisting |

### SnapshotBalances
Records token balances at snapshot time.

| Field | Type | Description |
|-------|------|-------------|
| `harvestBatchId` | UUID | Reference to harvest batch |
| `owner` | String | Wallet address |
| `tokenBalance` | BigInteger | IMG token balance (lamports) |

### DistributionBatch
Groups distribution transactions for efficient processing.

| Field | Type | Description |
|-------|------|-------------|
| `distributionBatchId` | UUID | Unique batch identifier |
| `totalSolDistributed` | BigInteger | Total SOL distributed in batch (lamports) |

### RewardsLedger
Maintains comprehensive transaction history and balance tracking.

| Field | Type | Description |
|-------|------|-------------|
| `harvestBatchId` | UUID | Reference to harvest batch |
| `distributionBatchId` | UUID | Reference to distribution batch |
| `signature` | String | Blockchain transaction signature (optional) |
| `tokenAmount` | BigInteger | IMG tokens involved (lamports) |
| `owner` | String | Wallet address |
| `blocktime` | Timestamp | Blockchain transaction time |
| `isCurrent` | Boolean | Latest ledger entry flag |
| `beforeTokenBalance` | BigInteger | Token balance before transaction (lamports) |
| `afterTokenBalance` | BigInteger | Token balance after transaction (lamports) |

**Chain Validation:** Process all transactions for an owner to ensure valid chain-of-calculation using before/after balances.

### WalletLedger
Tracks SOL balance changes via blockchain transactions for the rewards wallet.

| Field | Type | Description |
|-------|------|-------------|
| `beforeSolBalance` | BigInteger | SOL balance before transaction (lamports) |
| `solAmount` | BigInteger | SOL amount transacted (lamports) |
| `afterSolBalance` | BigInteger | SOL balance after transaction (lamports) |
| `beforeTokenBalance` | BigInteger | Token balance before transaction (lamports) |
| `tokenAmount` | BigInteger | Token amount transacted (lamports) |
| `afterTokenAmount` | BigInteger | Token balance after transaction (lamports) |
| `isCurrent` | Boolean | Latest ledger entry flag |
| `signature` | String | Blockchain transaction signature (primary key) |
| `blocktime` | Timestamp | Blockchain transaction time |

**Chain Validation:** Process all transactions to ensure valid chain-of-calculation using before/after SOL balances.

## Data Integrity

- **Atomic Operations:** All database updates within single transactions
- **Balance Validation:** Before/after balance chains prevent double-spending
- **Idempotent Runs:** Unique execution windows prevent duplicate processing
- **Audit Trail:** Complete transaction history with blockchain signatures

## Monitoring & Reporting

- Real-time pipeline status tracking via Snapshot status
- Comprehensive audit capabilities through linked ledger entries
- Balance reconciliation across all wallet types
- Transaction failure tracking and recovery procedures

---

*This system ensures transparent, secure, and efficient distribution of IMG token rewards while maintaining complete audit trails and preventing double-spending.*
