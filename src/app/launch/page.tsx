import { TokenForm } from "@/components/token-form"

export default function NewTokenPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Token</h1>
        <p className="text-gray-600">Configure your token and VRGDA parameters</p>
      </header>

      <TokenForm />
    </div>
  )
}