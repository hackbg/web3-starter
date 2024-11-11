'use client'

import { useSwitchChain, useAccount } from 'wagmi'
import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function NetworkSwitcher() {
  const { chain } = useAccount()
  const { chains, error, isPending, switchChain } = useSwitchChain()

  return (
    <>
      <a>Connected to {chain?.name ?? chain?.id}</a>
      {switchChain && (
        <div className="mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={isPending}>
                {isPending ? 'Switching...' : 'Switch'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {[...chains].map((x) =>
                x.id === chain?.id ? null : (
                  <DropdownMenuItem
                    key={x.id}
                    onClick={() => switchChain({ chainId: x.id })}
                  >
                    {x.name}
                  </DropdownMenuItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {error && (
        <Alert className="mt-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
    </>
  )
}
