'use client'

import { useState } from 'react'
import { parseEther, stringify } from 'viem'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'
import { Terminal, AlertCircle } from 'lucide-react'

import { useDebounce } from '@/hooks/useDebounce'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

export function SendTransactionPrepared() {
  const [to, setTo] = useState('')
  const debouncedTo = useDebounce(to)

  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value)

  const { config } = usePrepareSendTransaction({
    to: debouncedTo,
    value: debouncedValue ? parseEther(value as `${number}`) : undefined,
    enabled: Boolean(debouncedTo && debouncedValue),
  })
  const { data, error, isLoading, isError, sendTransaction } =
    useSendTransaction(config)
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
          sendTransaction?.()
        }}
      >
        <Input
          placeholder="Address"
          onChange={(e) => setTo(e.target.value)}
          value={to}
        />
        <Input
          className="w-1/3"
          id="value"
          placeholder="Value (Ether)"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <Button variant="outline" disabled={!sendTransaction} type="submit">
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

      <div className="mt-4">
        <a
          className="text-xs font-medium underline underline-offset-4"
          href="https://wagmi.sh/react/prepare-hooks#ux-pitfalls-without-prepare-hooks"
        >
          Learn about the UX Pitfalls without Prepare Hooks
        </a>
      </div>
    </>
  )
}
