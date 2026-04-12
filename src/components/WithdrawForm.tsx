import React, { useState } from 'react';
import { useVault } from '@/hooks/useVault';
import { ArrowDownCircle, Loader2 } from 'lucide-react';

export const WithdrawForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const { withdraw, isLoading, balance } = useVault();

  const handleMax = () => {
    setAmount((Number(balance) / 10000000).toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    try {
      const atomicAmount = BigInt(Math.floor(Number(amount) * 10000000));
      await withdraw(atomicAmount);
      setAmount('');
      alert('Withdrawal successful!');
    } catch (err) {
      console.error(err);
      alert('Withdrawal failed.');
    }
  };

  return (
    <div className="card h-full">
      <div className="flex items-center space-x-2 mb-6 text-slate-800">
        <ArrowDownCircle className="text-protox-accent" size={24} />
        <h3 className="text-lg font-bold">Withdraw Tokens</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="withdraw-amount" className="block text-sm font-medium text-slate-600">
              Amount (XLM)
            </label>
            <button 
              type="button" 
              onClick={handleMax}
              className="text-xs text-protox-primary font-bold hover:underline"
            >
              MAX
            </button>
          </div>
          <div className="relative">
            <input
              id="withdraw-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="input pr-16"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
              XLM
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !amount}
          className="btn-outline w-full flex justify-center items-center space-x-2 py-3"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <span>Withdraw from Vault</span>
          )}
        </button>
      </form>
      
      <p className="mt-4 text-xs text-slate-400 text-center">
        Withdrawing funds will stop reward generation for the withdrawn amount.
      </p>
    </div>
  );
};
