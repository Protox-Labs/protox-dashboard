import { useState, useCallback, useEffect } from 'react';

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  const connect = useCallback(async () => {
    setWallet((prev) => ({ ...prev, isConnecting: true, error: null }));
    try {
      // TODO: Implement actual Freighter/Albedo connection logic
      // For now, we simulate a successful connection
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockAddress = 'GDW67C7YCO6I7V2Z4N4Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z';
      
      setWallet({
        address: mockAddress,
        isConnected: true,
        isConnecting: false,
        error: null,
      });
    } catch (err) {
      setWallet((prev) => ({
        ...prev,
        isConnecting: false,
        error: err instanceof Error ? err.message : 'Failed to connect wallet',
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet({
      address: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  }, []);

  return {
    ...wallet,
    connect,
    disconnect,
  };
};
