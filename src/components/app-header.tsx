'use client'
import Link from 'next/link'
import { WalletButton } from '@/components/solana/solana-provider'

// export function AppHeader() {
//   return (
//     <header className="relative z-50 px-4 py-4 bg-black text-white">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center gap-4">
//           <Link className="text-2xl font-bold hover:text-blue-500 transition-colors" href="/">
//             <span>VRGDA</span>
//           </Link>
//         </div>
//         <WalletButton />
//       </div>
//     </header>
//   )
// }

import React, { useState, useEffect } from 'react';
import { Rocket, Menu, X, Moon, Sun, Wallet } from 'lucide-react';

const AppHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <Rocket className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Toknix
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/launch"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Launch
            </a>
            <a
              href="/projects"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Stats
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Learn
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <WalletButton />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-800"
            >
              Launches
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Projects
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Stats
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Learn
            </a>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center justify-between px-3">
                <WalletButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export { AppHeader };