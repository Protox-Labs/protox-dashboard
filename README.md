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

Whether you're looking to run the dashboard locally for your own use or planning to contribute to the codebase, follow these steps to get your local environment set up.

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** (v9+) or **yarn**
- A Stellar web wallet extension (e.g., [Freighter](https://www.freighter.app/) or [Albedo](https://albedo.link/))

### 1. Installation

Clone the repository to your local machine and install the required dependencies:

```bash
git clone [https://github.com/protox/protox-dashboard.git](https://github.com/protox/protox-dashboard.git)
cd protox-dashboard
npm install
```

### 2. Environment Variable Setup
The dashboard requires specific environment variables to connect to the Stellar network and the Protox smart contracts.

Create a file named .env.local in the root directory of the project and add the following variables:
```code snippet
# The network to connect to (e.g., testnet, futurenet, public)
NEXT_PUBLIC_NETWORK=testnet

# The contract ID of the deployed Protox Vault
NEXT_PUBLIC_VAULT_CONTRACT_ID=C...
```
(Note: If you are a new contributor, reach out in the community channels to get the latest testnet contract IDs!)

### 3. Development Commands
   To spin up the local development server with hot-reloading:
```bash
npm run dev
```

Open http://localhost:3000 in your browser. The page will reload automatically when you make edits.

To build and test the project for production locally:

```bash
npm run build
npm run start
```

### 4. Testing Commands
   We enforce basic code quality standards. Run these commands to ensure your setup is functioning correctly before making contributions:
```bash
# Run the test suite
npm test

# Run the linter to catch syntax and style issues
npm run lint
```
### 5. Common Troubleshooting
* Error: Node.js version is too low
   Ensure you are running Node.js version 18 or higher. You can check your version using node -v. We recommend using nvm to manage Node versions.

* Error: Contract ID not defined or a blank dashboard
Double-check your .env.local file. Make sure NEXT_PUBLIC_VAULT_CONTRACT_ID is set correctly. Remember to restart the development server (npm run dev) anytime you create or modify the .env.local file.

* Error: Port 3000 is already in use
Another application is currently using port 3000. You can stop the other application, or run the dashboard on a different port using npm run dev -- -p 3001.

* Wallet won't connect
Ensure your browser extension (like Freighter) is unlocked and set to the correct network (e.g., Testnet) matching your NEXT_PUBLIC_NETWORK variable.

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
