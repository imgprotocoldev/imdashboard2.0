import { useState, useEffect } from 'react';
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";
import { supabase, VoteResult } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Voting() {
  const { user, loading: authLoading } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [voteResults, setVoteResults] = useState<VoteResult[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Sample active voting data
  const activeVote = {
    id: "vote-002",
    title: "Do You Like the New Voting System?",
    description: "Welcome to the first edition of the Infinite Money Glitch Dashboard Voting System! 🚀\n\nThis is our very first step in building a truly community-driven platform, where every holder has a voice in shaping the future of $IMG. Your feedback helps us refine the dashboard and design new features that benefit everyone.\n\nPlease test the voting system by selecting one of the options. This vote will help us gauge how well the new feature works and how much the community enjoys using it.",
    image: "/images/voting/voting-system.webp",
    endDate: "2025-10-20T23:59:59.000Z",
    totalVotes: 0,
    options: [
      {
        id: "option-1",
        text: "Yes - It's great",
        votes: 0,
        percentage: 0
      },
      {
        id: "option-2", 
        text: "Ok - Can be improved",
        votes: 0,
        percentage: 0
      },
      {
        id: "option-3",
        text: "No - Delete now",
        votes: 0,
        percentage: 0
      }
    ]
  };

  // Sample voting history data
  const votingHistory = [
    {
      id: "vote-hist-001",
      title: "Increase infra",
      description: "2.5% Infra Temporarily Tax",
      endDate: "2025-09-08T23:59:59.000Z",
      status: "Passed",
      totalVotes: 103,
      winningOption: "Yes: Infra wallet Temporarily Tax 2.5%",
      winningVotes: 72,
      winningPercentage: 70.0
    },
    {
      id: "vote-hist-002", 
      title: "Logo Image for Kimbos shorts",
      description: "Logo Image Option A or B",
      endDate: "2025-08-30T23:59:59.000Z",
      status: "Passed",
      totalVotes: 87,
      winningOption: "Option B: Kimbos shorts IMG logo used.",
      winningVotes: 53,
      winningPercentage: 61.0
    },
    {
      id: "vote-hist-003",
      title: "Spaces with Kimbo Jr",
      description: "Spaces on Friday/saturday/sunday",
      endDate: "2025-08-29T23:59:59.000Z", 
      status: "Passed",
      totalVotes: 93,
      winningOption: "Friday: X Space With Kimbo Jr",
      winningVotes: 48,
      winningPercentage: 52.0
    },
    {
      id: "vote-hist-004",
      title: "Website url change",
      description: "deciding the best domain",
      endDate: "2025-08-26T23:59:59.000Z",
      status: "Passed",
      totalVotes: 82,
      winningOption: "Option 3: imgsolana.com website domain",
      winningVotes: 51,
      winningPercentage: 62.0
    },
    {
      id: "vote-hist-005",
      title: "Reward frequency",
      description: "Changing Holders rewards timeframe",
      endDate: "2025-08-23T23:59:59.000Z",
      status: "Passed",
      totalVotes: 140,
      winningOption: "Option 1: Every 6 hours rewards",
      winningVotes: 97,
      winningPercentage: 69.0
    },
    {
      id: "vote-hist-006",
      title: "Update IMG branding",
      description: "Pixel Bunny or [IMG] logo",
      endDate: "2025-08-22T23:59:59.000Z",
      status: "Passed",
      totalVotes: 155,
      winningOption: "OG [IMG]: Original IMG branding",
      winningVotes: 127,
      winningPercentage: 82.0
    },
    {
      id: "vote-hist-007",
      title: "Telegram View",
      description: "Group or Topics in Mainroom",
      endDate: "2025-08-22T23:59:59.000Z",
      status: "Passed",
      totalVotes: 119,
      winningOption: "Option 1: Telegram View set to group",
      winningVotes: 79,
      winningPercentage: 66.0
    }
  ];

  const handleVoteChange = (optionId: string) => {
    setSelectedOption(optionId);
  };

  // Supabase functions
  const fetchVoteResults = async () => {
    try {
      const { data, error } = await supabase
        .from('votes')
        .select('option_id')
        .eq('poll_id', activeVote.id);

      if (error) throw error;

      // Count votes per option
      const voteCounts: { [key: string]: number } = {};
      data?.forEach((vote: { option_id: string }) => {
        voteCounts[vote.option_id] = (voteCounts[vote.option_id] || 0) + 1;
      });

      const total = data?.length || 0;
      setTotalVotes(total);

      // Create results array
      const results: VoteResult[] = activeVote.options.map(option => {
        const count = voteCounts[option.id] || 0;
        return {
          option_id: option.id,
          count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0
        };
      });

      setVoteResults(results);
    } catch (error) {
      console.error('Error fetching vote results:', error);
    }
  };

  const checkUserVote = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('votes')
        .select('option_id')
        .eq('poll_id', activeVote.id)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (data) {
        setHasVoted(true);
        setSelectedOption(data.option_id);
      }
    } catch (error) {
      console.error('Error checking user vote:', error);
    }
  };

  const submitVote = async () => {
    if (!selectedOption || !user || hasVoted) return;

    setIsVoting(true);

    try {
      // Check if user already voted
      const { data: existingVote } = await supabase
        .from('votes')
        .select('id')
        .eq('poll_id', activeVote.id)
        .eq('user_id', user.id)
        .single();

      if (existingVote) {
        setHasVoted(true);
        return;
      }

      // Insert new vote
      const { error } = await supabase
        .from('votes')
        .insert({
          poll_id: activeVote.id,
          option_id: selectedOption,
          user_id: user.id
        });

      if (error) throw error;

      setHasVoted(true);
      
      // Refresh results
      await fetchVoteResults();
    } catch (error) {
      console.error('Error submitting vote:', error);
    } finally {
      setIsVoting(false);
    }
  };

  // Initialize voting data
  useEffect(() => {
    const initializeVoting = async () => {
      try {
        // Fetch vote results
        await fetchVoteResults();

        // Check if user has voted
        if (user) {
          await checkUserVote();
        }
      } catch (error) {
        console.error('Error initializing voting:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      initializeVoting();
    }
  }, [user, authLoading]);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('votes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'votes',
          filter: `poll_id=eq.${activeVote.id}`
        }, 
        () => {
          fetchVoteResults();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmitVote = () => {
    submitVote();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const voteLoading = loading || authLoading;

  return (
    <>
      <PageMeta
        title="IMG Voting | IMG Protocol Dashboard"
        description="Participate in IMG Protocol governance and view voting history"
      />
      <div className="space-y-6">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Poll Question Card */}
          <ComponentCard 
            title={activeVote.title}
            desc={`Ends: ${formatDate(activeVote.endDate)}`}
          >
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {activeVote.description}
              </p>
            </div>
          </ComponentCard>

          {/* Voting Options and Submit Card */}
          <ComponentCard 
            title="Cast Your Vote"
            desc="Select your preferred option and submit your vote"
            className="relative"
          >
            <div className="space-y-4">
              {voteLoading && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-600"></div>
                  Loading vote status...
                </div>
              )}

              {/* Voting Options */}
              <div className={hasVoted ? "space-y-2" : "space-y-3"}>
                {activeVote.options.map((option) => {
                  const result = voteResults.find(r => r.option_id === option.id);
                  const voteCount = result?.count || 0;
                  const percentage = result?.percentage || 0;
                  
                  return (
                    <div key={option.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center h-5 mt-1">
                        <input
                          id={option.id}
                          name="vote-option"
                          type="checkbox"
                          checked={selectedOption === option.id}
                          onChange={() => handleVoteChange(option.id)}
                          disabled={voteLoading || hasVoted || !user}
                          className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-0 dark:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div className="flex-1">
                        <label 
                          htmlFor={option.id}
                          className={`text-sm font-medium transition-colors block ${
                            hasVoted || !user 
                              ? 'text-gray-500 dark:text-gray-500 cursor-not-allowed' 
                              : 'text-gray-900 dark:text-white cursor-pointer hover:text-brand-600 dark:hover:text-brand-400'
                          }`}
                        >
                          {option.text}
                        </label>
                        {!voteLoading && totalVotes > 0 && hasVoted && (
                          <div className="mt-0.5 flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-brand-600 h-1.5 rounded-full transition-all duration-300" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 min-w-0">
                              {voteCount} votes ({percentage}%)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button
                    onClick={handleSubmitVote}
                    disabled={voteLoading || !selectedOption || hasVoted || isVoting || !user}
                    className="px-6 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
                  >
                    {isVoting ? 'Submitting...' : hasVoted ? 'Vote Submitted' : 'Submit Vote'}
                  </button>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
                      {!user ? (
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          Please log in to vote
                        </span>
                      ) : hasVoted ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          ✓ Vote submitted
                        </span>
                      ) : selectedOption ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          ✓ You have selected an option
                        </span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-500">
                          Please select an option above to continue
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ComponentCard>
        </div>


        {/* Voting History Section */}
        <ComponentCard 
          title="Voting History" 
          desc="Results from completed governance proposals"
        >
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-sm">
              <div className="max-w-full overflow-x-auto">
                <div className="min-w-[800px]">
                  <Table>
                    {/* Table Header */}
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-800/50">
                      <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <TableCell
                          isHeader
                          className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider"
                        >
                          Proposal
                        </TableCell>
                        <TableCell
                          isHeader
                          className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider"
                        >
                          End Date
                        </TableCell>
                        <TableCell
                          isHeader
                          className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider"
                        >
                          Total Votes
                        </TableCell>
                        <TableCell
                          isHeader
                          className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider"
                        >
                          Result
                        </TableCell>
                        <TableCell
                          isHeader
                          className="px-6 py-4 font-semibold text-gray-500 text-start text-sm dark:text-gray-400 uppercase tracking-wider"
                        >
                          Winning Option
                        </TableCell>
                      </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                      {votingHistory.map((vote, index) => (
                        <TableRow 
                          key={vote.id}
                          className={`group hover:bg-gray-100/80 dark:hover:bg-gray-700/40 transition-all duration-200 cursor-pointer ${
                            index % 2 === 0 
                              ? 'bg-white dark:bg-white/[0.02]' 
                              : 'bg-gray-50/50 dark:bg-gray-800/20'
                          }`}
                        >
                          <TableCell className="px-6 py-4 text-start">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                {vote.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                {vote.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4 text-gray-600 text-start text-sm dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                            {formatDate(vote.endDate)}
                          </TableCell>
                          <TableCell className="px-6 py-4 text-gray-900 text-start text-sm dark:text-white/90 font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {formatNumber(vote.totalVotes)}
                          </TableCell>
                          <TableCell className="px-6 py-4 text-gray-900 text-start text-sm dark:text-white/90 font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {vote.winningPercentage}%
                          </TableCell>
                          <TableCell className="px-6 py-4 text-start">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                {vote.winningOption.split(':')[0]}
                              </div>
                              {vote.winningOption.includes(':') && (
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                  {vote.winningOption.split(':')[1].trim()}
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
