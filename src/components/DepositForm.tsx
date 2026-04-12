import React, { useState } from 'react';
import { useVault } from '@/hooks/useVault';
import { ArrowUpCircle, Loader2 } from 'lucide-react';

export const DepositForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const { deposit, isLoading } = useVault();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    try {
      // Convert to atomic units (7 decimals for XLM)
      const atomicAmount = BigInt(Math.floor(Number(amount) * 10000000));
      await deposit(atomicAmount);
      setAmount('');
      alert('Deposit successful!');
    } catch (err) {
      console.error(err);
      alert('Deposit failed. See console for details.');
    }
  };

  return (
    <div className="card h-full">
      <div className="flex items-center space-x-2 mb-6 text-slate-800">
        <ArrowUpCircle className="text-protox-primary" size={24} />
        <h3 className="text-lg font-bold">Deposit Tokens</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="deposit-amount" className="block text-sm font-medium text-slate-600 mb-1.5">
            Amount (XLM)
          </label>
          <div className="relative">
            <input
              id="deposit-amount"
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
          className="btn-primary w-full flex justify-center items-center space-x-2 py-3"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <span>Deposit into Vault</span>
          )}
        </button>
      </form>
      
      <p className="mt-4 text-xs text-slate-400 text-center">
        Deposited funds will start earning rewards immediately.
      </p>
    </div>
  );
};
