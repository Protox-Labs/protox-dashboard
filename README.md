# Protox Dashboard

Protox Dashboard is the official web interface for the Protox protocol on Stellar. It provides a modern, user-friendly way to interact with Protox smart contracts, allowing users to deposit assets, earn yields, and manage their positions.

## Features

- **Wallet Integration**: Connect with popular Stellar wallets (Freighter, Albedo).
- **Vault Management**: Deposit and withdraw assets from Protox vaults.
- **Reward Tracking**: View and claim accumulated protocol rewards.
- **Transaction History**: Real-time overview of your vault activities.
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Blockchain**: [Stellar](https://stellar.org/) (Soroban)
- **SDK**: [Protox SDK](https://github.com/protox/protox-sdk)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Stellar wallet extension (e.g., [Freighter](https://www.freighter.app/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/protox/protox-dashboard.git
   cd protox-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_VAULT_CONTRACT_ID=CD...
   NEXT_PUBLIC_NETWORK=testnet
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

## Contribution Guidelines

We welcome contributions from the community! Whether you're fixing bugs, improving the UI, or adding new features.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

Protox Dashboard is open-source software licensed under the [MIT License](LICENSE).
