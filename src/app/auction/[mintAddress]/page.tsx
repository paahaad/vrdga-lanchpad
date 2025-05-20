"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Mock function to get token details - replace with actual data fetching
const getTokenDetails = (mintAddress: string) => {
  return {
    id: "1",
    name: "Decentralized Finance Token",
    symbol: "DFT",
    mintAddress: mintAddress,
    supply: "1,000,000",
    targetPrice: "0.5 SOL",
    initialPrice: "1 SOL",
    currentPrice: "0.75 SOL",
    timeRemaining: "2 days",
    description: "A token focused on decentralized finance applications and yield farming.",
  }
}

export default function AuctionPage({ params }: { params: { mintAddress: string } }) {
  const [amount, setAmount] = useState("")
  const token = getTokenDetails(params.mintAddress)

  const handleBuy = () => {
    // Implement buy logic here
    console.log(`Buying ${amount} tokens at ${token.currentPrice}`)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Token Auction Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 border-2 border-blue-500/20 bg-black/40 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-white">{token.name} ({token.symbol})</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Mint Address</p>
                <p className="font-mono text-sm text-white">{token.mintAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Description</p>
                <p className="text-white">{token.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Total Supply</p>
                  <p className="text-white">{token.supply}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Time Remaining</p>
                  <p className="text-white">{token.timeRemaining}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 border-blue-500/20 bg-black/40 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-white">Participate in Auction</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Current Price</p>
                <p className="text-2xl font-bold text-white">{token.currentPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Target Price</p>
                <p className="text-white">{token.targetPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Initial Price</p>
                <p className="text-white">{token.initialPrice}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Amount to Buy</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-black/50 border-blue-500/30 text-white"
                />
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                onClick={handleBuy}
              >
                Buy Tokens
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 