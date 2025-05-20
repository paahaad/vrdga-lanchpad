import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import Link from "next/link"

interface TokenCardProps {
  token: {
    id: string
    name: string
    symbol: string
    mintAddress: string
    supply: string
    targetPrice: string
    initialPrice: string
    currentPrice: string
    timeRemaining: string
    description: string
  }
}

export function TokenCard({ token }: TokenCardProps) {
  return (
    <Card className="overflow-hidden border-2 border-gray-800 hover:border-blue-500 transition-all bg-black text-white max-w-sm">
      <CardHeader className="bg-gradient-to-r from-gray-900 to-black pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-white">{token.name}</CardTitle>
            <CardDescription className="text-xs font-medium text-blue-400">{token.symbol}</CardDescription>
          </div>
          <div className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded">VRGDA</div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Mint Address:</span>
            <span className="font-mono text-xs text-white truncate max-w-[180px]" title={token.mintAddress}>
              {token.mintAddress}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Total Supply:</span>
            <span className="font-medium text-white">{token.supply}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Target Price:</span>
            <span className="font-medium text-white">{token.targetPrice}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Current Price:</span>
            <span className="font-medium text-blue-400">{token.currentPrice}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <Clock className="h-3 w-3" />
            <span>{token.timeRemaining} remaining</span>
          </div>
          <p className="text-xs text-gray-300 mt-1">{token.description}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 bg-gray-900 px-4 py-2">
        <Link href={`/auction/${token.mintAddress}`} className="w-full">
          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm py-1">
            Participate in Auction
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
