import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface TokenCardProps {
  token: {
    id: string
    name: string
    symbol: string
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
    <Card className="overflow-hidden border-2 border-gray-800 hover:border-blue-500 transition-all bg-black text-white">
      <CardHeader className="bg-gradient-to-r from-gray-900 to-black pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-white">{token.name}</CardTitle>
            <CardDescription className="text-sm font-medium text-blue-400">{token.symbol}</CardDescription>
          </div>
          <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">VRGDA</div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Supply:</span>
            <span className="font-medium text-white">{token.supply}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Target Price:</span>
            <span className="font-medium text-white">{token.targetPrice}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Current Price:</span>
            <span className="font-medium text-blue-400">{token.currentPrice}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-400 mt-2">
            <Clock className="h-4 w-4" />
            <span>{token.timeRemaining} remaining</span>
          </div>
          <p className="text-sm text-gray-300 mt-2">{token.description}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 bg-gray-900 px-6 py-4">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Participate in Auction</Button>
      </CardFooter>
    </Card>
  )
}
