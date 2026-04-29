import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useWallet } from '@/hooks/useWallet';

/**
 * Represents the current state of the Protox Vault for the connected user.
 */
export interface VaultState {
  /** The current balance of the user in atomic units (7 decimals for XLM). */
  balance: bigint;
  /** The total number of shares issued by the vault contract. */
  totalShares: bigint;
  /** Indicates if an initial or blocking data fetch is in progress. */
  isLoading: boolean;
  /** Indicates if a background refresh is in progress. */
  isRefreshing: boolean;
  /** Stores any error message related to vault operations. */
  error: string | null;
}

/**
 * Defines the available actions and state for interacting with the Protox Vault.
 */
interface VaultContextType extends VaultState {
  /**
   * Deposits a specified amount of tokens into the vault.
   * @param amount The amount to deposit in atomic units.
   * @returns A promise that resolves to a success indicator.
   */
  deposit: (amount: bigint) => Promise<{ success: boolean }>;
  
  /**
   * Withdraws a specified amount of tokens from the vault.
   * @param amount The amount to withdraw in atomic units.
   * @returns A promise that resolves to a success indicator.
   */
  withdraw: (amount: bigint) => Promise<{ success: boolean }>;
  
  /**
   * Claims any pending rewards for the user.
   * @returns A promise that resolves to a success indicator.
   */
  claimRewards: () => Promise<{ success: boolean }>;
  
  /**
   * Manually triggers a refresh of the vault data from the blockchain.
   * @returns A promise that resolves when the refresh is complete.
   */
  refresh: () => Promise<void>;
}

/**
 * React Context for the Protox Vault.
 */
const VaultContext = createContext<VaultContextType | undefined>(undefined);

/**
 * Provider component that manages the vault state and provides it to the component tree.
 */
export const VaultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { address, isConnected } = useWallet();
  
  // Initialize state with default mock values
  const [state, setState] = useState<VaultState>({
    balance: 15000000000n, // Initial balance: 1500 XLM (mock)
    totalShares: 100000n,
    isLoading: false,
    isRefreshing: false,
    error: null,
  });

  /**
   * Internal function to fetch vault data from the blockchain/SDK.
   * @param isInitial Whether this is the first load (shows blocking loader).
   */
  const fetchVaultData = useCallback(async (isInitial = false) => {
    // Only fetch if wallet is connected
    if (!isConnected || !address) return;

    // Set appropriate loading state
    if (isInitial) {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
    } else {
      setState((prev) => ({ ...prev, isRefreshing: true, error: null }));
    }

    try {
      // Simulate network latency for the SDK call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Update state with (mock) fetched data
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isRefreshing: false,
        error: null,
      }));
    } catch (err) {
      // Handle and store errors for UI feedback
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isRefreshing: false,
        error: err instanceof Error ? err.message : 'Failed to fetch vault data',
      }));
    }
  }, [address, isConnected]);

  // Effect to handle initial load and connection changes
  useEffect(() => {
    if (isConnected) {
      fetchVaultData(true);
    } else {
      // Reset state when disconnected
      setState(prev => ({ ...prev, balance: 0n, totalShares: 0n }));
    }
  }, [isConnected, fetchVaultData]);

  /**
   * Implementation of the deposit action.
   */
  const deposit = async (amount: bigint) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulation of transaction signing and submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Optimistic update of local balance for immediate UI feedback
      setState((prev) => ({
        ...prev,
        balance: prev.balance + amount,
        isLoading: false,
      }));

      // Background refresh to sync with blockchain state
      await fetchVaultData();
      
      return { success: true };
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Deposit failed',
      }));
      throw err;
    }
  };

  /**
   * Implementation of the withdraw action.
   */
  const withdraw = async (amount: bigint) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulation of transaction signing and submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Optimistic update of local balance
      setState((prev) => ({
        ...prev,
        balance: prev.balance - amount,
        isLoading: false,
      }));

      // Background refresh
      await fetchVaultData();
      return { success: true };
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Withdrawal failed',
      }));
      throw err;
    }
  };

  /**
   * Implementation of the claimRewards action.
   */
  const claimRewards = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulation of claim transaction
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Refresh to update rewards state (mock)
      await fetchVaultData();
      return { success: true };
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Claim failed',
      }));
      throw err;
    }
  };

  /**
   * Exposed refresh function for manual UI triggers.
   */
  const refresh = async () => {
    await fetchVaultData();
  };

  return (
    <VaultContext.Provider
      value={{
        ...state,
        deposit,
        withdraw,
        claimRewards,
        refresh,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVaultContext = () => {
  const context = useContext(VaultContext);
  if (context === undefined) {
    throw new Error('useVaultContext must be used within a VaultProvider');
  }
  return context;
};
