import { useVaultContext } from '../context/VaultContext';

/**
 * Custom hook to access the Vault context.
 * 
 * Provides access to vault-related state and actions such as:
 * - Current vault balance
 * - Deposit and withdraw functions
 * - Transaction loading states
 * 
 * This hook is a wrapper around useVaultContext for easier consumption.
 * 
 * @returns The current Vault context value.
 */
export const useVault = () => {
  return useVaultContext();
};
