'use client'
import Link from 'next/link'
import { WalletButton } from '@/components/solana/solana-provider'

export function AppHeader() {
  return (
    <header className="relative z-50 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-400">
      <div className="mx-auto flex justify-between items-center">
        <Link className="text-xl hover:text-neutral-500 dark:hover:text-white" href="/">
          <span>VRGDA</span>
        </Link>
        <WalletButton />
      </div>
    </header>
  )
}
