import React from 'react';
import { useVault } from '@/hooks/useVault';
import { Coins, RefreshCw, Trophy } from 'lucide-react';

/**
 * BalanceCard Component
 * 
 * Displays the current vault balance and pending rewards for the connected user.
 * Features a dynamic gradient background and provides actions to refresh data
 * and claim earned rewards.
 */
export const BalanceCard: React.FC = () => {
  // Destructure state and actions from the vault context
  const { balance, isLoading, isRefreshing, refresh, claimRewards } = useVault();

  /**
   * Formats the BigInt balance into a human-readable XLM string.
   * Stellar amounts are stored with 7 decimal places.
   */
  const formattedBalance = isLoading ? '...' : `${Number(balance) / 10000000} XLM`;

  return (
    <div className="card bg-gradient-to-br from-protox-primary to-protox-secondary text-white border-none shadow-lg shadow-protox-primary/20 relative overflow-hidden">
      {/* Loading overlay for refresh state to provide visual feedback during background updates */}
      {isRefreshing && (
        <div className="absolute inset-0 bg-protox-primary/10 backdrop-blur-[1px] flex items-center justify-center z-10">
          <RefreshCw size={24} className="animate-spin text-white/50" />
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
          <Coins size={24} />
        </div>
        <button 
          onClick={refresh}
          disabled={isLoading || isRefreshing}
          className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
        >
          <RefreshCw size={20} className={isLoading || isRefreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="space-y-1">
        <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Vault Balance</p>
        <h2 className="text-4xl font-bold tracking-tight">
          {formattedBalance}
        </h2>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Trophy size={18} className="text-yellow-400" />
          <span className="text-sm font-medium">Pending Rewards: 12.5 XLM</span>
        </div>
        <button 
          onClick={claimRewards}
          disabled={isLoading}
          className="px-4 py-1.5 bg-white text-protox-primary rounded-lg text-sm font-bold hover:bg-protox-light transition-all disabled:opacity-50"
        >
          Claim
        </button>
      </div>
    </div>
  );
};
