import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BalanceCard } from './BalanceCard';
import { useVault } from '@/hooks/useVault';

jest.mock('@/hooks/useVault', () => ({
  useVault: jest.fn(),
}));

const mockUseVault = useVault as jest.Mock;

const defaultVaultState = {
  balance: 15000000000n,
  totalShares: 100000n,
  isLoading: false,
  isRefreshing: false,
  error: null,
  deposit: jest.fn(),
  withdraw: jest.fn(),
  claimRewards: jest.fn(),
  refresh: jest.fn(),
};

const renderBalanceCard = (overrides = {}) => {
  const state = {
    ...defaultVaultState,
    refresh: jest.fn(),
    claimRewards: jest.fn(),
    ...overrides,
  };

  mockUseVault.mockReturnValue(state);
  render(<BalanceCard />);

  return state;
};

describe('BalanceCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the current balance and pending rewards', () => {
    renderBalanceCard();

    expect(screen.getByText('Vault Balance')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '1500 XLM' })).toBeInTheDocument();
    expect(screen.getByText('Pending Rewards: 12.5 XLM')).toBeInTheDocument();
  });

  it('shows a loading placeholder and disables actions while loading', () => {
    renderBalanceCard({ isLoading: true });

    expect(screen.getByRole('heading', { name: '...' })).toBeInTheDocument();

    const [refreshButton, claimButton] = screen.getAllByRole('button');
    expect(refreshButton).toBeDisabled();
    expect(claimButton).toBeDisabled();
  });

  it('renders zero balance clearly', () => {
    renderBalanceCard({ balance: 0n });

    expect(screen.getByRole('heading', { name: '0 XLM' })).toBeInTheDocument();
  });

  it('formats atomic Stellar units as XLM', () => {
    renderBalanceCard({ balance: 123456789n });

    expect(screen.getByRole('heading', { name: '12.3456789 XLM' })).toBeInTheDocument();
  });

  it('calls vault actions from the refresh and claim buttons', () => {
    const refresh = jest.fn();
    const claimRewards = jest.fn();

    renderBalanceCard({ refresh, claimRewards });

    const [refreshButton, claimButton] = screen.getAllByRole('button');
    fireEvent.click(refreshButton);
    fireEvent.click(claimButton);

    expect(refresh).toHaveBeenCalledTimes(1);
    expect(claimRewards).toHaveBeenCalledTimes(1);
  });
});
