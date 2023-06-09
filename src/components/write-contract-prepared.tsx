'use client'

import { useState } from 'react'
import { BaseError, stringify } from 'viem'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { Terminal, AlertCircle } from 'lucide-react'

import { wagmiContractConfig } from '@/config/contracts'
import { useDebounce } from '@/hooks/useDebounce'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function WriteContractPrepared() {
  const [tokenId, setTokenId] = useState('')
  const debouncedTokenId = useDebounce(tokenId)

  const { config } = usePrepareContractWrite({
    ...wagmiContractConfig,
    functionName: 'mint',
    enabled: Boolean(debouncedTokenId),
    args: [BigInt(debouncedTokenId)],
  })
  const { write, data, error, isLoading, isError } = useContractWrite(config)
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <>
      <form
        className="flex space-x-2"
        onSubmit={(e) => {
          e.preventDefault()
          write?.()
        }}
      >
        <Input
          placeholder="Token ID"
          onChange={(e) => setTokenId(e.target.value)}
        />
        <Button variant="outline" disabled={!write} type="submit">
          Mint
        </Button>
      </form>

      {isLoading && <div className="mt-3">Check Wallet...</div>}
      {isPending && <div className="mt-3">Transaction Pending...</div>}
      {isSuccess && (
        <Alert className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription className="mt-2 truncate">
            <p>Transaction Hash: {data?.hash}</p>
            <p>
              Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
            </p>
          </AlertDescription>
        </Alert>
      )}
      {isError && (
        <Alert className="mt-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {(error as BaseError)?.shortMessage}
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
