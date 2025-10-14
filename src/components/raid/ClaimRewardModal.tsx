import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/modal';
import Input from '../form/input/InputField';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import { sendRewardClaimNotification } from '../../utils/emailService';
import { showEmailStatus } from '../../utils/notificationService';

interface ClaimRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardName: string;
  rewardAmount: string;
  requiredPoints: number;
  onConfirm: () => Promise<void>;
}

const ClaimRewardModal: React.FC<ClaimRewardModalProps> = ({
  isOpen,
  onClose,
  rewardName,
  rewardAmount,
  requiredPoints,
  onConfirm,
}) => {
  const { user, supabase } = useSupabaseAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Load user data when modal opens
  useEffect(() => {
    if (isOpen && user) {
      loadUserData();
    }
  }, [isOpen, user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      // Get user profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username, wallet_address')
        .eq('id', user.id)
        .single();

      // Pre-fill the form with fallback for username
      let displayUsername = '';
      if (!profileError && profile?.username) {
        displayUsername = profile.username;
      } else {
        // Fallback: use user metadata or email prefix
        displayUsername = user.user_metadata?.full_name || user.email?.split('@')[0] || 'IMG User';
      }

      setUsername(displayUsername);
      setEmail(user.email || '');
      setWalletAddress(profile?.wallet_address || '');
    } catch (err) {
      console.error('Error loading user data:', err);
      // Fallback username even on error
      const fallbackUsername = user.user_metadata?.full_name || user.email?.split('@')[0] || 'IMG User';
      setUsername(fallbackUsername);
      setEmail(user.email || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Valid email is required');
      return;
    }
    if (!walletAddress.trim()) {
      setError('Wallet address is required');
      return;
    }

    setLoading(true);

    try {
      // First, deduct the points
      await onConfirm();

      // Store claim request in database
      const { error: dbError } = await supabase
        .from('reward_claims')
        .insert({
          user_id: user?.id,
          username: username,
          email: email,
          wallet_address: walletAddress,
          reward_type: rewardName,
          reward_amount: rewardAmount,
          points_spent: requiredPoints,
          status: 'pending',
          claimed_at: new Date().toISOString(),
        });

      if (dbError) {
        console.error('Error storing claim in database:', dbError);
        // Continue even if DB insert fails - the email is more important
      }

      // Send email notification to admins using the email service
      console.log('📧 Sending reward claim notification to admin emails...');
      
      const emailResult = await sendRewardClaimNotification({
        rewardName,
        rewardAmount,
        requiredPoints,
        username,
        email,
        walletAddress,
        userId: user?.id || 'N/A',
      });

      // Show email status notification
      showEmailStatus(emailResult.success, emailResult.error);
      
      if (!emailResult.success) {
        console.error('❌ Failed to send email notification:', emailResult.error);
        // Don't fail the entire claim if email fails
      }

      setSuccess(true);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        // Reset form
        setUsername('');
        setEmail('');
        setWalletAddress('');
        setSuccess(false);
      }, 2000);

    } catch (err: any) {
      console.error('Error claiming reward:', err);
      setError(err.message || 'Failed to claim reward. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError('');
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-md">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            🎁 Claim Your Reward
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You're about to claim <span className="font-bold text-emerald-600 dark:text-emerald-400">${rewardAmount} USD</span> in <span className="font-bold">{rewardName}</span>
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Claim submitted successfully!</span>
            </div>
            <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
              Our team will process your reward and send it to your wallet within 24-48 hours.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Form */}
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                We'll send you a confirmation email
              </p>
            </div>

            {/* Wallet Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Wallet Address <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter your Solana wallet address"
                disabled={loading}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Your reward will be sent to this address
              </p>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-blue-700 dark:text-blue-400">
                  <p className="font-semibold mb-1">Processing Time</p>
                  <p>Your reward will be processed within 24-48 hours. You'll receive an email confirmation once it's sent.</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-colors bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Claim $${rewardAmount} USD`
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default ClaimRewardModal;

