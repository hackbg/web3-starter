'use client'

import { parseEther, stringify } from 'viem'
import { useSendTransaction, useWaitForTransaction } from 'wagmi'
import { AlertCircle, Terminal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

export function SendTransaction() {
  const { data, error, isLoading, isError, sendTransaction } =
    useSendTransaction()
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
          const formData = new FormData(e.target as HTMLFormElement)
          const address = formData.get('address') as string
          const value = formData.get('value') as `${number}`
          sendTransaction({
            to: address,
            value: parseEther(value),
          })
        }}
      >
        <Input name="address" placeholder="Address" />
        <Input className="w-1/3" name="value" placeholder="Value (Ether)" />
        <Button variant="outline" type="submit">
          Send
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
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      )}
    </>
  )
}
