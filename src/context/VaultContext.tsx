import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useWallet } from '@/hooks/useWallet';

export interface VaultState {
  balance: bigint;
  totalShares: bigint;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
}

interface VaultContextType extends VaultState {
  deposit: (amount: bigint) => Promise<{ success: boolean }>;
  withdraw: (amount: bigint) => Promise<{ success: boolean }>;
  claimRewards: () => Promise<{ success: boolean }>;
  refresh: () => Promise<void>;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { address, isConnected } = useWallet();
  const [state, setState] = useState<VaultState>({
    balance: 15000000000n, // Initial balance: 1500 XLM
    totalShares: 100000n,
    isLoading: false,
    isRefreshing: false,
    error: null,
  });

  const fetchVaultData = useCallback(async (isInitial = false) => {
    if (!isConnected || !address) return;

    if (isInitial) {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
    } else {
      setState((prev) => ({ ...prev, isRefreshing: true, error: null }));
    }

    try {
      // TODO: Use actual Protox SDK to fetch data
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real app, this would fetch from the blockchain.
      // For the mock, we keep the current balance which might have been updated by deposit()
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isRefreshing: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isRefreshing: false,
        error: err instanceof Error ? err.message : 'Failed to fetch vault data',
      }));
    }
  }, [address, isConnected]);

  useEffect(() => {
    if (isConnected) {
      fetchVaultData(true);
    } else {
      setState(prev => ({ ...prev, balance: 0n, totalShares: 0n }));
    }
  }, [isConnected, fetchVaultData]);

  const deposit = async (amount: bigint) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // TODO: Implement actual deposit call via SDK
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Update local balance mock-style
      setState((prev) => ({
        ...prev,
        balance: prev.balance + amount,
        isLoading: false,
      }));

      // Trigger a refresh to simulate fetching the new state from blockchain
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

  const withdraw = async (amount: bigint) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // TODO: Implement actual withdraw call via SDK
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setState((prev) => ({
        ...prev,
        balance: prev.balance - amount,
        isLoading: false,
      }));

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

  const claimRewards = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // TODO: Implement actual claim_rewards call via SDK
      await new Promise((resolve) => setTimeout(resolve, 1500));
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
