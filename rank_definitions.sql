-- Rank Definitions for IMG Protocol Dashboard
-- Run this in your Supabase SQL Editor to populate the rank_definitions table

-- Clear existing data (optional - comment out if you want to keep existing data)
-- DELETE FROM rank_definitions;

-- Insert rank definitions
INSERT INTO rank_definitions (rank_id, rank_name, xp_required, points_reward) VALUES
(1, 'Rookie', 1000, 100),
(2, 'Amateur', 2500, 150),
(3, 'Skilled', 5000, 200),
(4, 'Veteran', 7500, 300),
(5, 'Pro', 10000, 400),
(6, 'Elite', 12500, 500),
(7, 'Champion', 15000, 600),
(8, 'Master', 20000, 750),
(9, 'Grandmaster', 25000, 1000),
(10, 'Legend', 30000, 1500),
(11, 'Mythic', 40000, 2000),
(12, 'Immortal', 50000, 3000),
(13, 'Glitcher', 75000, 5000)
ON CONFLICT (rank_id) DO UPDATE SET
  rank_name = EXCLUDED.rank_name,
  xp_required = EXCLUDED.xp_required,
  points_reward = EXCLUDED.points_reward;

-- Verify the data
SELECT * FROM rank_definitions ORDER BY rank_id;
