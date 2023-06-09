'use client'

import { useState } from 'react'
import { useWatchPendingTransactions } from 'wagmi'
import type { Hex } from 'viem'
import { ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'

export function WatchPendingTransactions() {
  const [isOpen, setIsOpen] = useState(false)
  const [hashes, setHashes] = useState<Hex[]>([])
  useWatchPendingTransactions({
    listener: (hashes) => setHashes((x) => [...x, ...hashes]),
  })

  const hashesOrdered = hashes.slice().reverse()

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center justify-between space-x-4">
        <h4 className="text-sm font-semibold">{hashes.length} hashes logged</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      {hashesOrdered.slice(0, 3).map((hash) => (
        <div
          key={hash}
          className="rounded-md border px-4 py-3 font-mono text-sm"
        >
          {hash}
        </div>
      ))}
      <CollapsibleContent className="space-y-2">
        {hashesOrdered.slice(3).map((hash) => (
          <div
            key={hash}
            className="rounded-md border px-4 py-3 font-mono text-sm"
          >
            {hash}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
