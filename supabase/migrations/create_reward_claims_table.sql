-- Create reward_claims table to store reward claim requests
CREATE TABLE IF NOT EXISTS reward_claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  reward_type TEXT NOT NULL,
  reward_amount TEXT NOT NULL,
  points_spent INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
  claimed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_reward_claims_user_id ON reward_claims(user_id);
CREATE INDEX IF NOT EXISTS idx_reward_claims_status ON reward_claims(status);
CREATE INDEX IF NOT EXISTS idx_reward_claims_claimed_at ON reward_claims(claimed_at DESC);

-- Enable Row Level Security
ALTER TABLE reward_claims ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own claims
CREATE POLICY "Users can view own reward claims"
  ON reward_claims
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own claims
CREATE POLICY "Users can create own reward claims"
  ON reward_claims
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Only admins can update claims (you can modify this based on your admin setup)
-- For now, we'll allow the service role to update
-- You can add admin role checking later

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_reward_claims_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reward_claims_updated_at_trigger
  BEFORE UPDATE ON reward_claims
  FOR EACH ROW
  EXECUTE FUNCTION update_reward_claims_updated_at();

-- Add comment to table
COMMENT ON TABLE reward_claims IS 'Stores reward claim requests from users';

