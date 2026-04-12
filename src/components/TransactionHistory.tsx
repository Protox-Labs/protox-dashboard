import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Gift, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'reward';
  amount: string;
  date: string;
  hash: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'deposit', amount: '500.00 XLM', date: '2024-04-12 14:30', hash: 'abc...123' },
  { id: '2', type: 'reward', amount: '2.50 XLM', date: '2024-04-11 09:15', hash: 'def...456' },
  { id: '3', type: 'withdraw', amount: '100.00 XLM', date: '2024-04-10 18:45', hash: 'ghi...789' },
];

export const TransactionHistory: React.FC = () => {
  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-6 text-slate-800">Transaction History</h3>
      
      <div className="space-y-4">
        {MOCK_TRANSACTIONS.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${
                tx.type === 'deposit' ? 'bg-green-100 text-green-600' :
                tx.type === 'withdraw' ? 'bg-blue-100 text-blue-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {tx.type === 'deposit' && <ArrowUpRight size={18} />}
                {tx.type === 'withdraw' && <ArrowDownLeft size={18} />}
                {tx.type === 'reward' && <Gift size={18} />}
              </div>
              
              <div>
                <p className="text-sm font-bold text-slate-800 capitalize">{tx.type}</p>
                <p className="text-xs text-slate-500">{tx.date}</p>
              </div>
            </div>

            <div className="text-right">
              <p className={`text-sm font-bold ${
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
        ))}
      </div>

      <button className="w-full mt-6 text-sm font-medium text-slate-500 hover:text-protox-primary transition-colors">
        View All Transactions
      </button>
    </div>
  );
};
