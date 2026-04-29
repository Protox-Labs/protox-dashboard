import React from 'react';
import { Navbar } from './Navbar';

/**
 * Layout component that provides the common structure for all pages.
 * Includes a responsive navigation bar, a main content area, and a footer.
 */
interface LayoutProps {
  /** The content to be rendered within the layout. */
  children: React.ReactNode;
}

/**
 * Main Layout component for the Protox Dashboard.
 * 
 * This component wraps the page content with consistent navigation and footer.
 * It uses a flexbox layout to ensure the footer stays at the bottom of the page
 * even when content is sparse.
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {children}
      </main>
      
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>© 2024 Protox Protocol. Built on Stellar.</p>
        </div>
      </footer>
    </div>
  );
};
