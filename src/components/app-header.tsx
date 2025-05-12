'use client'
import Link from 'next/link'
import { WalletButton } from '@/components/solana/solana-provider'

export function AppHeader() {
  return (
    <header className="relative z-50 px-4 py-4 bg-black text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl font-bold hover:text-blue-500 transition-colors" href="/">
          <span>VRGDA</span>
        </Link>
        <WalletButton />
      </div>
    </header>
  )
}
