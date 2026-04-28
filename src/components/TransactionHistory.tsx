import React, { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDownLeft, Gift, ExternalLink, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'reward';
  amount: string;
  date: string;
  hash: string;
  status: 'success' | 'failed';
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'deposit', amount: '500.00 XLM', date: '2024-04-12 14:30', hash: 'abc...123', status: 'success' },
  { id: '2', type: 'reward', amount: '2.50 XLM', date: '2024-04-11 09:15', hash: 'def...456', status: 'success' },
  { id: '3', type: 'withdraw', amount: '100.00 XLM', date: '2024-04-10 18:45', hash: 'ghi...789', status: 'success' },
  { id: '4', type: 'deposit', amount: '250.00 XLM', date: '2024-04-09 11:20', hash: 'jkl...012', status: 'failed' },
  { id: '5', type: 'withdraw', amount: '50.00 XLM', date: '2024-04-08 16:40', hash: 'mno...345', status: 'failed' },
  { id: '6', type: 'reward', amount: '1.20 XLM', date: '2024-04-07 10:00', hash: 'pqr...678', status: 'success' },
];

type FilterType = 'all' | 'deposit' | 'withdraw' | 'reward' | 'failed';

export const TransactionHistory: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return MOCK_TRANSACTIONS;
    if (filter === 'failed') return MOCK_TRANSACTIONS.filter(tx => tx.status === 'failed');
    return MOCK_TRANSACTIONS.filter(tx => tx.type === filter && tx.status === 'success');
  }, [filter]);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Deposits', value: 'deposit' },
    { label: 'Withdrawals', value: 'withdraw' },
    { label: 'Rewards', value: 'reward' },
    { label: 'Failed', value: 'failed' },
  ];

  return (
    <div className="card">
      <div className="flex flex-col space-y-4 mb-6">
        <h3 className="text-lg font-bold text-slate-800">Transaction History</h3>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                filter === f.value
                  ? 'bg-protox-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4 min-h-[200px]">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  tx.status === 'failed' ? 'bg-red-100 text-red-600' :
                  tx.type === 'deposit' ? 'bg-green-100 text-green-600' :
                  tx.type === 'withdraw' ? 'bg-blue-100 text-blue-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {tx.status === 'failed' ? <XCircle size={18} /> : (
                    <>
                      {tx.type === 'deposit' && <ArrowUpRight size={18} />}
                      {tx.type === 'withdraw' && <ArrowDownLeft size={18} />}
                      {tx.type === 'reward' && <Gift size={18} />}
                    </>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-bold text-slate-800 capitalize">
                    {tx.status === 'failed' ? `Failed ${tx.type}` : tx.type}
                  </p>
                  <p className="text-xs text-slate-500">{tx.date}</p>
                </div>
              </div>

              <div className="text-right">
                <p className={`text-sm font-bold ${
                  tx.status === 'failed' ? 'text-slate-400 line-through' :
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
                  className="text-[10px] text-slate-400 flex items-center justify-end hover:text-protox-primary"
                >
                  <span>{tx.hash}</span>
                  <ExternalLink size={10} className="ml-1" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-3 bg-slate-50 rounded-full text-slate-300 mb-3">
              <ExternalLink size={24} />
            </div>
            <p className="text-sm text-slate-500 font-medium">No transactions found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <button className="w-full mt-6 text-sm font-medium text-slate-500 hover:text-protox-primary transition-colors">
        View All Transactions
      </button>
    </div>
  );
};

