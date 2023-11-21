'use client'

import { useNetwork, useSwitchNetwork } from 'wagmi'
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
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  return (
    <>
      <a>
        Connected to {chain?.name ?? chain?.id}
        {chain?.unsupported && ' (unsupported)'}
      </a>
      {switchNetwork && (
        <div className="mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {isLoading ? 'Switching...' : 'Switch'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {chains.map((x) =>
                x.id === chain?.id ? null : (
                  <DropdownMenuItem
                    key={x.id}
                    onClick={() => switchNetwork(x.id)}
                  >
                    {x.name}
                    {isLoading && x.id === pendingChainId && ' (switching)'}
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
