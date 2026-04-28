import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  return (
    <WalletContext.Provider
      value={{
        ...wallet,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};
