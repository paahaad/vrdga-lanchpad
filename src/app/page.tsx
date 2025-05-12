import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TokenCard } from "@/components/token-card"
import { SearchBar } from "@/components/search-bar"

// Mock data for available tokens
const tokens = [
  {
    id: "1",
    name: "Decentralized Finance Token",
    symbol: "DFT",
    supply: "1,000,000",
    targetPrice: "0.5 SOL",
    initialPrice: "1 SOL",
    currentPrice: "0.75 SOL",
    timeRemaining: "2 days",
    description: "A token focused on decentralized finance applications and yield farming.",
  },
  {
    id: "2",
    name: "Governance Protocol",
    symbol: "GOV",
    supply: "500,000",
    targetPrice: "0.2 SOL",
    initialPrice: "0.4 SOL",
    currentPrice: "0.3 SOL",
    timeRemaining: "5 days",
    description: "A governance token for community-driven protocol decisions.",
  },
  {
    id: "3",
    name: "Metaverse Token",
    symbol: "META",
    supply: "2,000,000",
    targetPrice: "0.1 SOL",
    initialPrice: "0.25 SOL",
    currentPrice: "0.18 SOL",
    timeRemaining: "3 days",
    description: "A utility token for virtual world interactions and digital asset ownership.",
  },
  {
    id: "4",
    name: "AI Research Network",
    symbol: "AIR",
    supply: "750,000",
    targetPrice: "0.8 SOL",
    initialPrice: "1.5 SOL",
    currentPrice: "1.2 SOL",
    timeRemaining: "1 day",
    description: "A token powering decentralized AI research and model training.",
  },
  {
    id: "5",
    name: "Gaming Rewards",
    symbol: "PLAY",
    supply: "5,000,000",
    targetPrice: "0.05 SOL",
    initialPrice: "0.1 SOL",
    currentPrice: "0.07 SOL",
    timeRemaining: "4 days",
    description: "Reward token for in-game achievements and marketplace transactions.",
  },
  {
    id: "6",
    name: "DeFi Insurance",
    symbol: "SAFE",
    supply: "300,000",
    targetPrice: "1.5 SOL",
    initialPrice: "2.5 SOL",
    currentPrice: "2 SOL",
    timeRemaining: "6 days",
    description: "Insurance protocol token for protecting DeFi positions and smart contracts.",
  },
  {
    id: "7",
    name: "NFT Marketplace",
    symbol: "NFTX",
    supply: "1,500,000",
    targetPrice: "0.3 SOL",
    initialPrice: "0.6 SOL",
    currentPrice: "0.45 SOL",
    timeRemaining: "2 days",
    description: "Utility token for NFT marketplace governance and fee discounts.",
  },
  {
    id: "8",
    name: "Cross-Chain Bridge",
    symbol: "BRIDGE",
    supply: "400,000",
    targetPrice: "1.2 SOL",
    initialPrice: "2 SOL",
    currentPrice: "1.6 SOL",
    timeRemaining: "3 days",
    description: "Token for cross-chain liquidity and bridge protocol governance.",
  }
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Token Auction Launchpad</h1>
        <p className="text-gray-600">Launch and discover tokens using Variable Rate Gradual Dutch Auction (VRGDA)</p>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <Link href="/new-token">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Create New Token</Button>
        </Link>
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token) => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
    </div>
  )
}
