/**
 * Configuration for Stellar and Soroban network environments.
 * Contains network passphrases and endpoint URLs for RPC and Horizon services.
 */
export const NETWORKS = {
  /** Stellar Testnet configuration (default for development). */
  TESTNET: {
    networkPassphrase: 'Test SDF Network ; September 2015',
    rpcUrl: 'https://soroban-testnet.stellar.org',
    horizonUrl: 'https://horizon-testnet.stellar.org',
  },
  /** Stellar Mainnet configuration for production deployment. */
  MAINNET: {
    networkPassphrase: 'Public Global Stellar Network ; October 2015',
    rpcUrl: 'https://soroban-rpc.stellar.org',
    horizonUrl: 'https://horizon.stellar.org',
  },
};

/** The default network to use if no other network is specified. */
export const DEFAULT_NETWORK = NETWORKS.TESTNET;

/**
 * Smart contract addresses for the Protox protocol.
 * These addresses are environment-specific and should be updated for different networks.
 */
export const CONTRACT_ADDRESSES = {
  /** The unique identifier for the Vault smart contract. */
  VAULT: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ID || 'CDW67C7YCO6I7V2Z4N4Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z',
};
