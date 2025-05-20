'use client'
import React, { useState } from 'react';
import {
  Coins,
  Calendar,
  DollarSign,
  Lock,
  Percent,
  Shield,
} from 'lucide-react';

interface FormData {
  tokenName: string;
  tokenSymbol: string;
  tokenSupply: string;
  decimals: string;
  salePrice: string;
  softCap: string;
  hardCap: string;
  minPurchase: string;
  maxPurchase: string;
  presaleStartDate: string;
  presaleEndDate: string;
  vestingPeriod: string;
  vestingRelease: string;
  liquidityPercent: string;
  liquidityLockup: string;
  description: string;
  website: string;
  twitter: string;
  telegram: string;
  github: string;
}

const TokenLaunchForm = () => {
  const [formData, setFormData] = useState<FormData>({
    tokenName: '',
    tokenSymbol: '',
    tokenSupply: '',
    decimals: '9',
    salePrice: '',
    softCap: '',
    hardCap: '',
    minPurchase: '',
    maxPurchase: '',
    presaleStartDate: '',
    presaleEndDate: '',
    vestingPeriod: '',
    vestingRelease: '',
    liquidityPercent: '',
    liquidityLockup: '',
    description: '',
    website: '',
    twitter: '',
    telegram: '',
    github: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Launch Your Token</h1>
          <p className="text-gray-400 text-lg">
            Complete the form below to launch your token on Solana
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 space-y-8"
        >
          {/* Token Basic Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Coins className="text-purple-400" />
              Token Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Token Name
                </label>
                <input
                  type="text"
                  name="tokenName"
                  value={formData.tokenName}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Solana Token"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Token Symbol
                </label>
                <input
                  type="text"
                  name="tokenSymbol"
                  value={formData.tokenSymbol}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., SOL"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Total Supply
                </label>
                <input
                  type="number"
                  name="tokenSupply"
                  value={formData.tokenSupply}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 1000000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Decimals
                </label>
                <input
                  type="number"
                  name="decimals"
                  value={formData.decimals}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 9"
                  required
                />
              </div>
            </div>
          </div>

          {/* Sale Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <DollarSign className="text-purple-400" />
              Sale Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Token Price (USDC)
                </label>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 0.1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Soft Cap (USDC)
                </label>
                <input
                  type="number"
                  name="softCap"
                  value={formData.softCap}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 50000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hard Cap (USDC)
                </label>
                <input
                  type="number"
                  name="hardCap"
                  value={formData.hardCap}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 100000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Minimum Purchase (USDC)
                </label>
                <input
                  type="number"
                  name="minPurchase"
                  value={formData.minPurchase}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Maximum Purchase (USDC)
                </label>
                <input
                  type="number"
                  name="maxPurchase"
                  value={formData.maxPurchase}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 5000"
                  required
                />
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Calendar className="text-purple-400" />
              Sale Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Presale Start Date
                </label>
                <input
                  type="datetime-local"
                  name="presaleStartDate"
                  value={formData.presaleStartDate}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Presale End Date
                </label>
                <input
                  type="datetime-local"
                  name="presaleEndDate"
                  value={formData.presaleEndDate}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Vesting */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Lock className="text-purple-400" />
              Vesting Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vesting Period (days)
                </label>
                <input
                  type="number"
                  name="vestingPeriod"
                  value={formData.vestingPeriod}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 90"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Token Release (%)
                </label>
                <input
                  type="number"
                  name="vestingRelease"
                  value={formData.vestingRelease}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Liquidity */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Percent className="text-purple-400" />
              Liquidity Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Liquidity Percentage (%)
                </label>
                <input
                  type="number"
                  name="liquidityPercent"
                  value={formData.liquidityPercent}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 60"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Liquidity Lockup (days)
                </label>
                <input
                  type="number"
                  name="liquidityLockup"
                  value={formData.liquidityLockup}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 365"
                  required
                />
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Shield className="text-purple-400" />
              Project Information
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                placeholder="Describe your project..."
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://twitter.com/"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telegram
                </label>
                <input
                  type="url"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://t.me/"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://github.com/"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-purple-500/20"
            >
              Launch Token
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { TokenLaunchForm };