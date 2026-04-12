# Protox Dashboard Frontend Guide

This guide provides an overview of the frontend architecture and how to build on top of the Protox Dashboard.

## Project Structure

Protox Dashboard is a Next.js project structured for modularity and scalability.

```text
protox-dashboard/
├── src/
│   ├── components/      # UI components (Navbar, forms, cards)
│   ├── pages/           # Next.js pages (Home, Dashboard)
│   ├── hooks/           # Protocol logic (useWallet, useVault)
│   ├── utils/           # Utility functions and network config
│   └── styles/          # Tailwind CSS and global styles
├── tests/               # Unit and integration tests
├── public/              # Static assets (images, icons)
└── docs/                # Project documentation
```

## Component Design

We follow a component-driven design approach. Each component should be self-contained and reusable.

### Example: BalanceCard

The `BalanceCard` component is responsible for displaying the user's current vault balance and rewards.

```tsx
import React from 'react';
import { useVault } from '@/hooks/useVault';

export const BalanceCard: React.FC = () => {
  const { balance, isLoading } = useVault();
  
  return (
    <div className="card">
      <h3>Vault Balance</h3>
      <p>{isLoading ? 'Loading...' : `${Number(balance) / 10000000} XLM`}</p>
    </div>
  );
};
```

## Protocol Hooks

The dashboard's logic is encapsulated in custom React hooks.

### useWallet

The `useWallet` hook handles the connection state and interactions with Stellar wallets.

```tsx
import { useWallet } from '@/hooks/useWallet';

const MyComponent = () => {
  const { address, isConnected, connect } = useWallet();
  
  return (
    <div>
      {isConnected ? <p>Connected: {address}</p> : <button onClick={connect}>Connect</button>}
    </div>
  );
};
```

### useVault

The `useVault` hook provides a high-level interface for interacting with the Protox vault contract using the Protox SDK.

```tsx
import { useVault } from '@/hooks/useVault';

const MyComponent = () => {
  const { balance, deposit } = useVault();
  
  const handleDeposit = async (amount: bigint) => {
    await deposit(amount);
  };
};
```

## Styling with Tailwind CSS

We use Tailwind CSS for all styling needs. This allows for rapid development and consistent UI.

### Custom Classes

We've defined several custom Tailwind classes in `src/styles/globals.css`:
- `.btn-primary`: The primary call-to-action button style.
- `.btn-outline`: The secondary button style.
- `.card`: The standard container style for dashboard elements.
- `.input`: The standard form input style.

## Testing

We use Jest and React Testing Library for testing our components and hooks.

```bash
npm test
```

## Extension Points

- **New Pages**: Create new files in `src/pages/` to add new views to the dashboard.
- **New Components**: Add new UI elements in `src/components/` to enhance the dashboard's features.
- **Advanced Logic**: Extend `useVault` or create new hooks to support additional protocol functionality.

## Best Practices

- **Type Safety**: Always use TypeScript for all new code.
- **Component Modularity**: Keep components small and focused on a single responsibility.
- **Error Handling**: Implement robust error handling for all protocol interactions.
- **Accessibility**: Ensure all components are accessible to users with disabilities.
