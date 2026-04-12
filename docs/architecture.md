# Protox Dashboard Architecture

Protox Dashboard is a modern, high-performance web application built with Next.js, React, and Tailwind CSS. It serves as the primary user interface for the Protox protocol on Stellar.

## Overview

The dashboard is designed as a modular frontend that interacts with the Protox SDK to communicate with Stellar smart contracts.

### Core Components

- **Next.js Framework**: The backbone of the application, providing efficient routing, server-side rendering, and performance optimizations.
- **Protox SDK Integration**: The dashboard uses the Protox SDK for all blockchain interactions, including fetching balances, submitting transactions, and simulating contract calls.
- **Stellar Wallet Adapters**: Integration with Freighter and Albedo wallets for secure transaction signing.
- **React Hooks**: Custom hooks (`useWallet`, `useVault`) encapsulate protocol-specific logic and state management.

## Application Flow

1. **User Interaction**: User initiates an action (e.g., "Connect Wallet" or "Deposit Tokens").
2. **Hook Execution**: The appropriate hook (`useWallet` or `useVault`) is triggered.
3. **SDK Communication**: The hook calls methods from the Protox SDK.
4. **Wallet Signing**: For state-changing actions, the SDK prompts the connected Stellar wallet to sign the transaction.
5. **Blockchain Submission**: The signed transaction is submitted to the Stellar network via the Soroban RPC.
6. **State Update**: Upon confirmation, the dashboard updates the local state and UI to reflect the successful transaction.

## Modular Component Design

The dashboard's UI is built using a collection of reusable React components:
- **Navbar**: Navigation and wallet connection state.
- **BalanceCard**: High-level vault state and rewards.
- **Deposit/Withdraw Forms**: Specialized forms for protocol interactions.
- **TransactionHistory**: Real-time overview of vault activities.

## State Management

The dashboard uses React's built-in state management via hooks:
- **Wallet State**: Manages the connection status, user address, and active network.
- **Vault State**: Tracks user balances, total protocol shares, and pending rewards.
- **UI State**: Handles loading indicators, error messages, and form inputs.

## Security Considerations

- **Client-Side Signing**: All private keys and signing processes remain within the user's wallet (e.g., Freighter); the dashboard never has access to sensitive credentials.
- **Transaction Simulation**: Every state-changing action is simulated before submission to estimate fees and verify expected outcomes.
- **Sanitization**: All user inputs (e.g., deposit amounts) are validated and sanitized before being processed.

## Extension Points

- **New Contract Modules**: Add new hooks and components to support additional Protox protocol contracts.
- **Advanced Analytics**: Integrate charting libraries for more detailed vault performance views.
- **Multi-Wallet Support**: Extend the wallet connector to support more Stellar wallets.
- **Governance Portal**: Build a dedicated interface for protocol voting and parameter adjustments.
