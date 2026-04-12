export const NETWORKS = {
  TESTNET: {
    networkPassphrase: 'Test SDF Network ; September 2015',
    rpcUrl: 'https://soroban-testnet.stellar.org',
    horizonUrl: 'https://horizon-testnet.stellar.org',
  },
  MAINNET: {
    networkPassphrase: 'Public Global Stellar Network ; October 2015',
    rpcUrl: 'https://soroban-rpc.stellar.org',
    horizonUrl: 'https://horizon.stellar.org',
  },
};

export const DEFAULT_NETWORK = NETWORKS.TESTNET;

export const CONTRACT_ADDRESSES = {
  VAULT: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ID || 'CDW67C7YCO6I7V2Z4N4Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z',
};
