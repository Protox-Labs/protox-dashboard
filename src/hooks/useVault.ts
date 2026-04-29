import { useVaultContext } from '../context/VaultContext';

export const useVault = () => {
  return useVaultContext();
};
