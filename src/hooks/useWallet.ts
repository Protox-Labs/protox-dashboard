import { useWalletContext } from '../context/WalletContext';

/**
 * Custom hook to access the Wallet context.
 * 
 * Provides access to wallet-related state and actions such as:
 * - Connected wallet address
 * - Connection status (isConnected, isConnecting)
 * - Connect and disconnect methods
 * 
 * This hook is a wrapper around useWalletContext for easier consumption.
 * 
 * @returns The current Wallet context value.
 */
export const useWallet = () => {
  return useWalletContext();
};
