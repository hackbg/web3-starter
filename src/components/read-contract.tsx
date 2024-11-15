'use client'

import { useState } from 'react'
import { type Address, BaseError } from 'viem'
import { useReadContract } from 'wagmi'
import { AlertCircle } from 'lucide-react'

import { wagmiContractConfig } from '@/config/contracts'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

export function TotalSupply() {
  const { data, isRefetching, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'totalSupply',
  })

  return (
    <>
      <div>{data?.toString()}</div>
      <Button
        className="mt-4"
        variant="outline"
        disabled={isRefetching}
        onClick={() => refetch()}
      >
        {isRefetching ? 'Loading...' : 'Refetch'}
      </Button>
    </>
  )
}

export function BalanceOf() {
  const [address, setAddress] = useState<Address>(
    '0xDF5599366Df97e966fDFcBE8Da6DcabDbF4c2EC6',
  )
  const { data, error, isLoading, isSuccess } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: Boolean(address) },
  })

  const [value, setValue] = useState<string>(address)

  return (
    <>
      <div className="flex space-x-2">
        <Input
          onChange={(e) => setValue(e.target.value)}
          placeholder="wallet address"
          style={{ marginLeft: 4 }}
          value={value}
        />
        <Button variant="outline" onClick={() => setAddress(value as Address)}>
          {isLoading ? 'Fetching...' : 'Fetch'}
        </Button>
      </div>
      <div className="p-2">Result: {isSuccess && data?.toString()}</div>

      {error && (
        <Alert className="mt-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {(error as BaseError).shortMessage}
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
