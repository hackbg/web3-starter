'use client'

import { BaseError, stringify } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Terminal, AlertCircle } from 'lucide-react'

import { wagmiContractConfig } from '@/config/contracts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

export function WriteContract() {
  const {
    writeContract,
    data: txHash,
    error,
    isPending: isWritePending,
    isError,
  } = useWriteContract()
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: txHash })

  return (
    <>
      <form
        className="flex space-x-2"
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const tokenId = formData.get('tokenId') as string
          writeContract({
            ...wagmiContractConfig,
            functionName: 'mint',
            args: [BigInt(tokenId)],
          })
        }}
      >
        <Input name="tokenId" placeholder="Token ID" />
        <Button variant="outline" disabled={isWritePending} type="submit">
          Mint
        </Button>
      </form>

      {isWritePending && <div className="mt-3">Check Wallet...</div>}
      {isPending && <div className="mt-3">Transaction Pending...</div>}
      {isSuccess && (
        <Alert className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription className="mt-2 truncate">
            <p>Transaction Hash: {txHash}</p>
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
