import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TokenCard } from "@/components/token-card"
import { SearchBar } from "@/components/search-bar"
import Hero from "@/components/hero"
import { UpcomingLaunches } from "@/components/upcoming-launches"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <UpcomingLaunches />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <Link href="/launch">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Create New Token</Button>
        </Link>
        <SearchBar />
      </div>

      
    </div>
  )
}
