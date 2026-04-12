import React from 'react';
import { useVault } from '@/hooks/useVault';
import { Coins, RefreshCw, Trophy } from 'lucide-react';

export const BalanceCard: React.FC = () => {
  const { balance, isLoading, refresh, claimRewards } = useVault();

  return (
    <div className="card bg-gradient-to-br from-protox-primary to-protox-secondary text-white border-none shadow-lg shadow-protox-primary/20">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
          <Coins size={24} />
        </div>
        <button 
          onClick={refresh}
          disabled={isLoading}
          className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
        >
          <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="space-y-1">
        <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Vault Balance</p>
        <h2 className="text-4xl font-bold tracking-tight">
          {isLoading ? '...' : `${Number(balance) / 10000000} XLM`}
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
