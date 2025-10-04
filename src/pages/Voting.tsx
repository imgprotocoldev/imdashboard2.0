import { useState } from 'react';
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/ui/table";

export default function Voting() {
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Sample active voting data
  const activeVote = {
    id: "vote-001",
    title: "IMG Protocol Governance Proposal #1",
    description: "Should we implement a new reward distribution mechanism that allocates 5% of trading volume to community development fund?",
    image: "/images/voting/governance-proposal-1.webp",
    endDate: "2025-01-15T23:59:59.000Z",
    totalVotes: 0,
    options: [
      {
        id: "option-1",
        text: "Yes - Implement the new distribution mechanism",
        votes: 0,
        percentage: 0
      },
      {
        id: "option-2", 
        text: "No - Keep current distribution mechanism",
        votes: 0,
        percentage: 0
      },
      {
        id: "option-3",
        text: "Abstain - No preference",
        votes: 0,
        percentage: 0
      }
    ]
  };

  // Sample voting history data
  const votingHistory = [
    {
      id: "vote-hist-001",
      title: "IMG Token Burn Proposal",
      description: "Proposal to burn 10M IMG tokens from treasury",
      endDate: "2024-12-20T23:59:59.000Z",
      status: "Passed",
      totalVotes: 1250000,
      winningOption: "Yes - Burn 10M tokens",
      winningVotes: 850000,
      winningPercentage: 68.0
    },
    {
      id: "vote-hist-002", 
      title: "Exchange Listing Fee Structure",
      description: "Proposal to reduce listing fees for new exchanges",
      endDate: "2024-12-10T23:59:59.000Z",
      status: "Rejected",
      totalVotes: 980000,
      winningOption: "No - Keep current fee structure",
      winningVotes: 520000,
      winningPercentage: 53.1
    },
    {
      id: "vote-hist-003",
      title: "Community Rewards Program",
      description: "Proposal to increase community rewards by 25%",
      endDate: "2024-11-25T23:59:59.000Z", 
      status: "Passed",
      totalVotes: 2100000,
      winningOption: "Yes - Increase rewards by 25%",
      winningVotes: 1680000,
      winningPercentage: 80.0
    }
  ];

  const handleVoteChange = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleSubmitVote = () => {
    if (selectedOption) {
      // Here you would typically submit the vote to your backend
      console.log('Voting for option:', selectedOption);
      alert('Vote submitted successfully!');
      setSelectedOption('');
    } else {
      alert('Please select an option before voting');
    }
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
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {activeVote.description}
              </p>
            </div>
          </ComponentCard>

          {/* Voting Options and Submit Card */}
          <ComponentCard 
            title="Cast Your Vote"
            desc="Select your preferred option and submit your vote"
          >
            <div className="space-y-6">
              {/* Voting Options */}
              <div className="space-y-4">
                {activeVote.options.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center h-5 mt-1">
                      <input
                        id={option.id}
                        name="vote-option"
                        type="checkbox"
                        checked={selectedOption === option.id}
                        onChange={() => handleVoteChange(option.id)}
                        className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-0 dark:bg-gray-700 rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <label 
                        htmlFor={option.id}
                        className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition-colors block"
                      >
                        {option.text}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button
                    onClick={handleSubmitVote}
                    disabled={!selectedOption}
                    className="px-6 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
                  >
                    Submit Vote
                  </button>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
                      {selectedOption ? (
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
          <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-white/[0.05]">
              <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                <TableRow>
                  <TableCell className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Proposal
                  </TableCell>
                  <TableCell className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    End Date
                  </TableCell>
                  <TableCell className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Total Votes
                  </TableCell>
                  <TableCell className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Result
                  </TableCell>
                  <TableCell className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Winning Option
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-white/[0.05]">
                {votingHistory.map((vote) => (
                  <TableRow key={vote.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                    <TableCell className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {vote.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {vote.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatDate(vote.endDate)}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatNumber(vote.totalVotes)}
                    </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">{vote.winningPercentage}%</span>
                      </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 pl-8">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {vote.winningOption}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
