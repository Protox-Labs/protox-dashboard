import React from 'react';
import { Layout } from '@/components/Layout';
import { BalanceCard } from '@/components/BalanceCard';
import { DepositForm } from '@/components/DepositForm';
import { WithdrawForm } from '@/components/WithdrawForm';
import { TransactionHistory } from '@/components/TransactionHistory';
import { useWallet } from '@/hooks/useWallet';
import { Wallet } from 'lucide-react';

/**
 * Dashboard Page component.
 * 
 * The central hub for users to interact with the Protox protocol.
 * If the user is not connected, it prompts them to connect their wallet.
 * Once connected, it displays the balance card, deposit/withdraw forms, and transaction history.
 */
export default function Dashboard() {
  const { isConnected, connect, isConnecting } = useWallet();

  if (!isConnected) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <div className="p-6 bg-blue-50 rounded-full text-protox-primary">
            <Wallet size={64} />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Wallet Not Connected</h2>
            <p className="text-slate-600 max-w-md">
              Please connect your Stellar wallet to view your vault balance and manage your positions.
            </p>
          </div>
          <button
            onClick={connect}
            disabled={isConnecting}
            className="btn-primary px-8 py-3 text-lg"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Manage your Protox vault positions and rewards.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BalanceCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DepositForm />
              <WithdrawForm />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <TransactionHistory />
          </div>
        </div>
      </div>
    </Layout>
  );
}
