import React, { useState } from 'react';
import { useVault } from '@/hooks/useVault';
import { ArrowDownCircle, Loader2 } from 'lucide-react';

/**
 * WithdrawForm Component
 * 
 * Provides a user interface for withdrawing XLM from the Protox vault.
 * Includes a "MAX" button functionality and validates against current vault balance.
 */
export const WithdrawForm: React.FC = () => {
  // State for the withdrawal amount as a string input
  const [amount, setAmount] = useState<string>('');
  
  // Destructure required actions and state from the vault hook
  const { withdraw, isLoading, balance } = useVault();

  /**
   * Sets the input amount to the user's total vault balance.
   * Converts from atomic units back to decimal XLM.
   */
  const handleMax = () => {
    // Convert BigInt balance (7 decimals) to a standard number/string
    const decimalBalance = Number(balance) / 10000000;
    setAmount(decimalBalance.toString());
  };

  /**
   * Handles withdrawal form submission.
   * Converts the amount to atomic units and triggers the withdraw action.
   * @param e React Form Event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // Stop form from refreshing the page
    e.preventDefault();
    
    // Validate that amount is present and numeric
    if (!amount || isNaN(Number(amount))) return;
    
    try {
      // Calculate atomic amount (BigInt) to ensure precision for blockchain transaction
      const atomicAmount = BigInt(Math.floor(Number(amount) * 10000000));
      
      // Call the withdrawal function from VaultContext
      await withdraw(atomicAmount);
      
      // Reset input on successful withdrawal
      setAmount('');
      
      // User notification
      alert('Withdrawal successful!');
    } catch (err) {
      // Detailed error logging for debugging
      console.error('Withdrawal submission error:', err);
      alert('Withdrawal failed. Please check your balance and try again.');
    }
  };

  return (
    <div className="card h-full">
      {/* Header section with accent colored icon */}
      <div className="flex items-center space-x-2 mb-6 text-slate-800">
        <ArrowDownCircle className="text-protox-accent" size={24} />
        <h3 className="text-lg font-bold">Withdraw Tokens</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          {/* Label and MAX button container */}
          <div className="flex justify-between items-center">
            <label 
              htmlFor="withdraw-amount" 
              className="block text-sm font-medium text-slate-600"
            >
              Amount (XLM)
            </label>
            <button 
              type="button" 
              onClick={handleMax}
              className="text-xs text-protox-primary font-bold hover:underline hover:text-protox-secondary transition-all"
              title="Use maximum available balance"
            >
              MAX
            </button>
          </div>
          
          <div className="relative group">
            <input
              id="withdraw-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="input pr-16 focus:ring-protox-accent/20 transition-all"
              required
            />
            {/* Currency suffix badge */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 group-focus-within:text-protox-accent transition-colors">
              XLM
            </div>
          </div>
        </div>

        {/* Action button using outline variant */}
        <button
          type="submit"
          disabled={isLoading || !amount}
          className="btn-outline w-full flex justify-center items-center space-x-2 py-3 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Withdrawing...</span>
            </>
          ) : (
            <span>Withdraw from Vault</span>
          )}
        </button>
      </form>
      
      {/* Informational footer note about rewards */}
      <p className="mt-4 text-xs text-slate-400 text-center leading-relaxed">
        Withdrawing funds will stop reward generation for the withdrawn amount. <br />
        Standard Stellar network fees apply.
      </p>
    </div>
  );
};
