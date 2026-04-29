import React, { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDownLeft, Gift, ExternalLink, XCircle } from 'lucide-react';

/**
 * Transaction Interface
 * 
 * Defines the structure for a single transaction record in the history list.
 */
interface Transaction {
  /** Unique identifier for the transaction (hash or UUID). */
  id: string;
  /** The category of the transaction. */
  type: 'deposit' | 'withdraw' | 'reward';
  /** Human-readable amount with currency suffix (e.g., "500.00 XLM"). */
  amount: string;
  /** ISO or formatted date string of the transaction. */
  date: string;
  /** Shortened transaction hash for display. */
  hash: string;
  /** Final status of the transaction on the network. */
  status: 'success' | 'failed';
}

/**
 * Mock data for the transaction history.
 * In a production environment, this would be fetched from a Horizon or Soroban RPC indexer.
 */
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'deposit', amount: '500.00 XLM', date: '2024-04-12 14:30', hash: 'abc...123', status: 'success' },
  { id: '2', type: 'reward', amount: '2.50 XLM', date: '2024-04-11 09:15', hash: 'def...456', status: 'success' },
  { id: '3', type: 'withdraw', amount: '100.00 XLM', date: '2024-04-10 18:45', hash: 'ghi...789', status: 'success' },
  { id: '4', type: 'deposit', amount: '250.00 XLM', date: '2024-04-09 11:20', hash: 'jkl...012', status: 'failed' },
  { id: '5', type: 'withdraw', amount: '50.00 XLM', date: '2024-04-08 16:40', hash: 'mno...345', status: 'failed' },
  { id: '6', type: 'reward', amount: '1.20 XLM', date: '2024-04-07 10:00', hash: 'pqr...678', status: 'success' },
];

/** Supported filter types for the transaction list. */
type FilterType = 'all' | 'deposit' | 'withdraw' | 'reward' | 'failed';

/**
 * TransactionHistory Component
 * 
 * Displays a filterable list of past vault activities.
 * Provides links to Stellar Expert for detailed transaction inspection.
 */
export const TransactionHistory: React.FC = () => {
  // Current active filter selection
  const [filter, setFilter] = useState<FilterType>('all');

  /**
   * Memoized list of filtered transactions to prevent unnecessary recalculations.
   * Returns successful transactions matching the type, or all failed transactions.
   */
  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return MOCK_TRANSACTIONS;
    if (filter === 'failed') return MOCK_TRANSACTIONS.filter(tx => tx.status === 'failed');
    return MOCK_TRANSACTIONS.filter(tx => tx.type === filter && tx.status === 'success');
  }, [filter]);

  /** Available filter options with display labels. */
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Deposits', value: 'deposit' },
    { label: 'Withdrawals', value: 'withdraw' },
    { label: 'Rewards', value: 'reward' },
    { label: 'Failed', value: 'failed' },
  ];

  return (
    <div className="card shadow-sm border-slate-100">
      {/* Header and Filter navigation */}
      <div className="flex flex-col space-y-4 mb-6">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Transaction History</h3>
        
        {/* Horizontal scrollable filter buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                filter === f.value
                  ? 'bg-protox-primary text-white shadow-md shadow-protox-primary/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Transaction list container */}
      <div className="space-y-4 min-h-[200px]">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => (
            <div 
              key={tx.id} 
              className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all group border border-transparent hover:border-slate-100"
            >
              {/* Left side: Icon and metadata */}
              <div className="flex items-center space-x-4">
                <div className={`p-2.5 rounded-lg ${
                  tx.status === 'failed' ? 'bg-red-50 text-red-500' :
                  tx.type === 'deposit' ? 'bg-green-50 text-green-500' :
                  tx.type === 'withdraw' ? 'bg-blue-50 text-blue-500' :
                  'bg-yellow-50 text-yellow-500'
                }`}>
                  {tx.status === 'failed' ? <XCircle size={20} /> : (
                    <>
                      {tx.type === 'deposit' && <ArrowUpRight size={20} />}
                      {tx.type === 'withdraw' && <ArrowDownLeft size={20} />}
                      {tx.type === 'reward' && <Gift size={20} />}
                    </>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 capitalize leading-none mb-1">
                    {tx.status === 'failed' ? `Failed ${tx.type}` : tx.type}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{tx.date}</span>
                </div>
              </div>

              {/* Right side: Amount and blockchain link */}
              <div className="text-right">
                <p className={`text-sm font-extrabold mb-0.5 ${
                  tx.status === 'failed' ? 'text-slate-300 line-through decoration-red-300' :
                  tx.type === 'deposit' ? 'text-green-600' :
                  tx.type === 'withdraw' ? 'text-blue-600' :
                  'text-yellow-600'
                }`}>
                  {tx.type === 'withdraw' ? '-' : '+'}{tx.amount}
                </p>
                <a 
                  href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-slate-400 font-mono flex items-center justify-end hover:text-protox-primary transition-colors"
                  title="View on Stellar Expert"
                >
                  <span>{tx.hash}</span>
                  <ExternalLink size={10} className="ml-1" />
                </a>
              </div>
            </div>
          ))
        ) : (
          /* Empty state view */
          <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
            <div className="p-4 bg-slate-50 rounded-full text-slate-300 mb-4">
              <ExternalLink size={32} strokeWidth={1.5} />
            </div>
            <p className="text-sm text-slate-600 font-bold">No transactions found</p>
            <p className="text-xs text-slate-400 mt-1.5 max-w-[180px]">
              We couldn't find any activities matching your current filters.
            </p>
          </div>
        )}
      </div>

      {/* Footer action button */}
      <button className="w-full mt-8 py-2 text-sm font-bold text-slate-400 hover:text-protox-primary border-t border-slate-50 transition-all hover:bg-slate-50/50 rounded-b-xl">
        View All Transactions
      </button>
    </div>
  );
};

