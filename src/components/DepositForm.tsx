import React, { useState } from 'react';
import { useVault } from '@/hooks/useVault';
import { ArrowUpCircle, Loader2 } from 'lucide-react';

/**
 * DepositForm Component
 * 
 * Provides a user interface for depositing XLM into the Protox vault.
 * Handles amount validation, conversion to atomic units, and transaction submission.
 */
export const DepositForm: React.FC = () => {
  // Local state for the input amount as a string to handle decimal points easily
  const [amount, setAmount] = useState<string>('');
  
  // Access vault actions and state via custom hook
  const { deposit, isLoading } = useVault();

  /**
   * Handles the form submission event.
   * Validates the input, converts to BigInt, and triggers the deposit.
   * @param e React Form Event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent default form submission behavior (page refresh)
    e.preventDefault();
    
    // Basic validation: ensure amount is present and is a valid number
    if (!amount || isNaN(Number(amount))) return;
    
    try {
      // Convert the decimal XLM amount to atomic units (7 decimal places)
      // Example: 1.5 XLM -> 15,000,000 atomic units
      const atomicAmount = BigInt(Math.floor(Number(amount) * 10000000));
      
      // Execute the deposit transaction
      await deposit(atomicAmount);
      
      // Clear the input field upon successful submission
      setAmount('');
      
      // Notify the user of success
      alert('Deposit successful!');
    } catch (err) {
      // Log error details and notify user of failure
      console.error('Deposit submission error:', err);
      alert('Deposit failed. See console for details.');
    }
  };

  return (
    <div className="card h-full">
      {/* Header section with icon and title */}
      <div className="flex items-center space-x-2 mb-6 text-slate-800">
        <ArrowUpCircle className="text-protox-primary" size={24} />
        <h3 className="text-lg font-bold">Deposit Tokens</h3>
      </div>

      {/* Main deposit form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label 
            htmlFor="deposit-amount" 
            className="block text-sm font-medium text-slate-600"
          >
            Amount (XLM)
          </label>
          <div className="relative group">
            <input
              id="deposit-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="input pr-16 focus:ring-protox-primary/20 transition-all"
              required
            />
            {/* Currency suffix badge */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 group-focus-within:text-protox-primary transition-colors">
              XLM
            </div>
          </div>
        </div>

        {/* Action button with loading state */}
        <button
          type="submit"
          disabled={isLoading || !amount}
          className="btn-primary w-full flex justify-center items-center space-x-2 py-3 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <span>Deposit into Vault</span>
          )}
        </button>
      </form>
      
      {/* Footer information note */}
      <p className="mt-4 text-xs text-slate-400 text-center leading-relaxed">
        Deposited funds will start earning rewards immediately. <br />
        Standard Stellar network fees apply.
      </p>
    </div>
  );
};
