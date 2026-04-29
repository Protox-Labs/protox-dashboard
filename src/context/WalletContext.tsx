import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

/**
 * Represents the current connection state of the user's Stellar wallet.
 */
export interface WalletState {
  /** The public key (G...) of the connected wallet, or null if not connected. */
  address: string | null;
  /** Indicates if the wallet is currently connected. */
  isConnected: boolean;
  /** Indicates if a connection attempt is currently in progress. */
  isConnecting: boolean;
  /** Stores any error message related to wallet connection/disconnection. */
  error: string | null;
}

/**
 * Defines the available actions and state for wallet management.
 */
interface WalletContextType extends WalletState {
  /**
   * Initiates a connection request to a supported Stellar wallet (Freighter, Albedo, etc.).
   * @returns A promise that resolves when the connection attempt finishes.
   */
  connect: () => Promise<void>;
  
  /**
   * Disconnects the current wallet and resets the connection state.
   */
  disconnect: () => void;
}

/**
 * React Context for the Stellar Wallet integration.
 */
const WalletContext = createContext<WalletContextType | undefined>(undefined);

/**
 * Provider component that manages the wallet connection state.
 */
export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state with null/false values
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  /**
   * Implementation of the connect action.
   */
  const connect = useCallback(async () => {
    // Set loading state and clear previous errors
    setWallet((prev) => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      // Simulation of wallet discovery and user approval process
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock public key for development purposes
      const mockAddress = 'GDW67C7YCO6I7V2Z4N4Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z';
      
      // Update state with connected account info
      setWallet({
        address: mockAddress,
        isConnected: true,
        isConnecting: false,
        error: null,
      });
    } catch (err) {
      // Handle connection failures (e.g., user rejected, wallet not installed)
      setWallet((prev) => ({
        ...prev,
        isConnecting: false,
        error: err instanceof Error ? err.message : 'Failed to connect wallet',
      }));
    }
  }, []);

  /**
   * Implementation of the disconnect action.
   */
  const disconnect = useCallback(() => {
    // Simple reset of the state to default values
    setWallet({
      address: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  }, []);

  // Provide the state and actions to the component tree
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
