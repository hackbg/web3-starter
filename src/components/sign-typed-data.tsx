'use client'

import { useEffect, useState } from 'react'
import { recoverTypedDataAddress } from 'viem'
import { type Address, useSignTypedData } from 'wagmi'
import { Terminal, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const

const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const

const message = {
  from: {
    name: 'Cow',
    wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  },
  to: {
    name: 'Bob',
    wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  },
  contents: 'Hello, Bob!',
} as const

export function SignTypedData() {
  const { data, error, isLoading, signTypedData } = useSignTypedData({
    domain,
    types,
    message,
    primaryType: 'Mail',
  })

  const [recoveredAddress, setRecoveredAddress] = useState<Address>()
  useEffect(() => {
    if (!data) return
    ;(async () => {
      setRecoveredAddress(
        await recoverTypedDataAddress({
          domain,
          types,
          message,
          primaryType: 'Mail',
          signature: data,
        }),
      )
    })()
  }, [data])

  return (
    <>
      <Button
        variant="outline"
        disabled={isLoading}
        onClick={() => signTypedData()}
      >
        Sign Message
      </Button>

      {isLoading && <div className="mt-3">Check Wallet...</div>}

      {data && (
        <Alert className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="truncate">Signature: {data}</p>
            <p className="truncate">Recovered address: {recoveredAddress}</p>
          </AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert className="mt-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      )}
    </>
  )
}
