'use client'

import { useState } from 'react'
import { useReadContracts } from 'wagmi'
import { erc20Abi, formatUnits, type Address } from 'viem'
import { AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { wagmiContractConfig } from '@/config/contracts'

export function Token() {
  const [address, setAddress] = useState<Address>(
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // UNI
  )

  const { data, error, isError, isLoading, refetch } = useReadContracts({
    allowFailure: false,
    contracts: ['totalSupply', 'decimals', 'symbol'].map((functionName) => ({
      address,
      abi: erc20Abi,
      functionName,
    })),
  })

  const [totalSupply, decimals, symbol] = (data ?? []) as [
    bigint,
    number,
    string,
  ]

  return (
    <>
      <div className="flex space-x-2">
        <Input
          onChange={(e) => setAddress(e.target.value as Address)}
          placeholder="token address"
          value={address}
        />
        <Button variant="outline" onClick={() => refetch()}>
          Fetch
        </Button>
      </div>

      {data && (
        <div className="mt-4">
          Total Supply: {formatUnits(totalSupply, decimals)} {symbol}
        </div>
      )}

      {isLoading && <div>Fetching token...</div>}
      {isError && (
        <Alert className="mt-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      )}
    </>
  )
}
