'use client'

import { useState } from 'react'
import { Log, stringify } from 'viem'
import { useContractEvent } from 'wagmi'
import { ChevronsUpDown } from 'lucide-react'

import { usdcContractConfig, wagmiContractConfig } from '@/config/contracts'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'

export function WatchContractEvents() {
  const [isUsdcLogsOpen, setIsUsdcLogsOpen] = useState(false)
  const [usdcLogs, setUsdcLogs] = useState<Log[]>([])
  useContractEvent({
    ...usdcContractConfig,
    eventName: 'Transfer',
    listener: (logs) => setUsdcLogs((x) => [...x, ...logs]),
  })

  const [isWagmiLogsOpen, setIsWagmiLogsOpen] = useState(false)
  const [wagmiLogs, setWagmiLogs] = useState<Log[]>([])
  useContractEvent({
    ...wagmiContractConfig,
    eventName: 'Transfer',
    listener: (logs) => setWagmiLogs((x) => [...x, ...logs]),
  })

  return (
    <>
      <Collapsible
        open={isUsdcLogsOpen}
        onOpenChange={setIsUsdcLogsOpen}
        className="space-y-2"
      >
        <div className="flex items-center justify-between space-x-4">
          <h4 className="text-sm font-semibold">
            {usdcLogs.length} USDC `Transfer`s logged
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          {usdcLogs.reverse().map((log, idx) => (
            <div
              key={idx}
              className="break-words rounded-md border px-4 py-3 font-mono text-sm"
            >
              {stringify(log)}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={isWagmiLogsOpen}
        onOpenChange={setIsWagmiLogsOpen}
        className="mt-2 space-y-2"
      >
        <div className="flex items-center justify-between space-x-4">
          <h4 className="text-sm font-semibold">
            {wagmiLogs.length} wagmi `Transfer`s logged
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          {wagmiLogs.reverse().map((log, idx) => (
            <div
              key={idx}
              className="break-words rounded-md border px-4 py-3 font-mono text-sm"
            >
              {stringify(log)}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}
