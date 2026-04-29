import React from 'react';
import Link from 'next/link';
import { useWallet } from '@/hooks/useWallet';
import { Wallet, LogOut, LayoutDashboard, Home } from 'lucide-react';

/**
 * Responsive Navigation Bar component.
 * 
 * Provides links to key sections of the application and handles wallet connection/disconnection.
 * Features a sticky design with a backdrop blur effect for a modern look.
 */
export const Navbar: React.FC = () => {
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();

  /**
   * Truncates a Stellar wallet address for display purposes.
   * Shows the first 6 and last 4 characters.
   * 
   * @param addr The full Stellar address (e.g., G...)
   * @returns A formatted string like "GB34RD...A2E1"
   */
  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-protox-primary">Protox</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link href="/" className="flex items-center space-x-1 text-slate-600 hover:text-protox-primary transition-colors">
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link href="/dashboard" className="flex items-center space-x-1 text-slate-600 hover:text-protox-primary transition-colors">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected && address ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 bg-protox-light px-3 py-1.5 rounded-full border border-protox-accent/20">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">
                    {truncateAddress(address)}
                  </span>
                </div>
                <button
                  onClick={disconnect}
                  className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                  title="Disconnect"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="btn-primary flex items-center space-x-2"
              >
                <Wallet size={18} />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
