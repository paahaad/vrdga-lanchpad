import { TokenCard } from "@/components/token-card"

// TODO: Fetch the data from the database, Mock data for available tokens 
const tokens = [
    {
      id: "1",
      name: "Decentralized Finance Token",
      symbol: "DFT",
      mintAddress: "DFT1234567890abcdef1234567890abcdef12345678",
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
      mintAddress: "GOV1234567890abcdef1234567890abcdef12345678",
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
      mintAddress: "GOV1234567890abcdef1234567890abcdef12345678",
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
      mintAddress: "GOV1234567890abcdef1234567890abcdef12345678",
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
      mintAddress: "GOV1234567890abcdef1234567890abcdef12345678",
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
      mintAddress: "GOV1234567890abcdef1234567890abcdef12345678",
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
      mintAddress: "GOV1234567890abcdef1234567890abcdef12345678",
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
      mintAddress: "GOV1234567890abcdef1234567890abcdef12345678",
      supply: "400,000",
      targetPrice: "1.2 SOL",
      initialPrice: "2 SOL",
      currentPrice: "1.6 SOL",
      timeRemaining: "3 days",
      description: "Token for cross-chain liquidity and bridge protocol governance.",
    }
  ]
  
export default function Projects() {
  return (
    <div> 
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upcoming Projects</h1>
          <p className="text-gray-400 text-lg">
            Explore the latest projects launching on Solana
          </p>
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token) => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
    </div>
    
  )
} 