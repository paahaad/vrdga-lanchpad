"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoIcon } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TokenForm() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    supply: "",
    description: "",
    targetPrice: "0.05",
    decayConstant: "0.5",
    timeScale: "86400", // 1 day in seconds
    initialPrice: "0.1",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0].toString() }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Token data submitted:", formData)
    // Here you would typically send this data to your backend
    alert("Token creation initiated! Check back soon for your auction.")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="token-details" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="token-details">Token Details</TabsTrigger>
          <TabsTrigger value="vrgda-params">VRGDA Parameters</TabsTrigger>
        </TabsList>

        <TabsContent value="token-details">
          <Card>
            <CardHeader>
              <CardTitle>Basic Token Information</CardTitle>
              <CardDescription>Enter the details for your new token</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Token Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Decentralized Finance Token"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symbol">Token Symbol</Label>
                <Input
                  id="symbol"
                  name="symbol"
                  placeholder="e.g., DFT"
                  value={formData.symbol}
                  onChange={handleChange}
                  required
                  maxLength={5}
                />
                <p className="text-xs text-gray-500">Maximum 5 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supply">Total Supply</Label>
                <Input
                  id="supply"
                  name="supply"
                  type="number"
                  placeholder="e.g., 1000000"
                  value={formData.supply}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Token Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your token and its use cases..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vrgda-params">
          <Card>
            <CardHeader>
              <CardTitle>VRGDA Configuration</CardTitle>
              <CardDescription>Configure the Variable Rate Gradual Dutch Auction parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="targetPrice">Target Price (ETH)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The ideal long-term price for your token</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="targetPrice"
                    min={0.001}
                    max={1}
                    step={0.001}
                    value={[Number.parseFloat(formData.targetPrice)]}
                    onValueChange={(value) => handleSliderChange("targetPrice", value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    name="targetPrice"
                    value={formData.targetPrice}
                    onChange={handleChange}
                    className="w-24"
                    step="0.001"
                    min="0.001"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="initialPrice">Initial Price (ETH)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The starting price of your token auction</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="initialPrice"
                    min={0.001}
                    max={1}
                    step={0.001}
                    value={[Number.parseFloat(formData.initialPrice)]}
                    onValueChange={(value) => handleSliderChange("initialPrice", value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    name="initialPrice"
                    value={formData.initialPrice}
                    onChange={handleChange}
                    className="w-24"
                    step="0.001"
                    min="0.001"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="decayConstant">Decay Constant</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Controls how quickly the price decreases. Higher values mean faster price drops.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="decayConstant"
                    min={0.1}
                    max={1}
                    step={0.1}
                    value={[Number.parseFloat(formData.decayConstant)]}
                    onValueChange={(value) => handleSliderChange("decayConstant", value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    name="decayConstant"
                    value={formData.decayConstant}
                    onChange={handleChange}
                    className="w-24"
                    step="0.1"
                    min="0.1"
                    max="1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="timeScale">Time Scale (seconds)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The time period over which the auction runs. 86400 = 1 day.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="timeScale"
                  name="timeScale"
                  type="number"
                  value={formData.timeScale}
                  onChange={handleChange}
                  min="3600"
                  step="3600"
                />
                <div className="flex gap-2 mt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData((prev) => ({ ...prev, timeScale: "86400" }))}
                  >
                    1 Day
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData((prev) => ({ ...prev, timeScale: "604800" }))}
                  >
                    1 Week
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData((prev) => ({ ...prev, timeScale: "2592000" }))}
                  >
                    30 Days
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-8">
          Launch Token
        </Button>
      </div>
    </form>
  )
}
