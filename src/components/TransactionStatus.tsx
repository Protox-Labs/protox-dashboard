import React from 'react';
import { Loader2, CheckCircle2, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

/**
 * Possible states for a blockchain transaction.
 */
export type TxStatus = 'idle' | 'pending' | 'success' | 'failed' | 'cancelled';

/**
 * Properties for the TransactionStatus component.
 */
interface TransactionStatusProps {
  /** The current lifecycle state of the transaction. */
  status: TxStatus;
  /** Optional transaction hash for linking to the block explorer. */
  hash?: string;
  /** Optional error message to display if the transaction fails. */
  error?: string;
}

/**
 * TransactionStatus component.
 * 
 * Displays a visual indicator of a transaction's current status (pending, success, failed, etc.).
 * Provides an optional link to the Stellar Expert explorer if a transaction hash is available.
 */
export const TransactionStatus: React.FC<TransactionStatusProps> = ({ status, hash, error }) => {
  if (status === 'idle') return null;

  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return { icon: <Loader2 className="animate-spin text-blue-500" size={20} />, text: 'Transaction Pending...', bg: 'bg-blue-50', border: 'border-blue-200' };
      case 'success':
        return { icon: <CheckCircle2 className="text-green-500" size={20} />, text: 'Transaction Successful!', bg: 'bg-green-50', border: 'border-green-200' };
      case 'failed':
        return { icon: <XCircle className="text-red-500" size={20} />, text: error || 'Transaction Failed', bg: 'bg-red-50', border: 'border-red-200' };
      case 'cancelled':
        return { icon: <AlertCircle className="text-yellow-500" size={20} />, text: 'Transaction Cancelled', bg: 'bg-yellow-50', border: 'border-yellow-200' };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  if (!config) return null;

  return (
    <div className={`mt-4 p-3 rounded-lg border ${config.bg} ${config.border} flex flex-col space-y-2`}>
      <div className="flex items-center space-x-2">
        {config.icon}
        <span className="text-sm font-medium text-slate-700">{config.text}</span>
      </div>
      {hash && (
        <a
          href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
        >
          <span>View on Explorer</span>
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
};