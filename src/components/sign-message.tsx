'use client'

import { useEffect, useState } from 'react'
import { recoverMessageAddress, type Address } from 'viem'
import { useSignMessage } from 'wagmi'
import { AlertCircle, Terminal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

export function SignMessage() {
  const [recoveredAddress, setRecoveredAddress] = useState<Address>()
  const {
    data: signature,
    variables,
    error,
    isPending,
    signMessage,
  } = useSignMessage()

  useEffect(() => {
    ;(async () => {
      if (variables?.message && signature) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature,
        })
        setRecoveredAddress(recoveredAddress)
      }
    })()
  }, [signature, variables?.message])

  return (
    <>
      <form
        className="flex space-x-2"
        onSubmit={(event) => {
          event.preventDefault()
          const element = event.target as HTMLFormElement
          const formData = new FormData(element)
          const message = formData.get('message') as string
          signMessage({ message })
        }}
      >
        <Input name="message" type="text" required />
        <Button
          className="w-[74px]"
          variant="outline"
          disabled={isPending}
          type="submit"
        >
          Sign
        </Button>
      </form>

      {isPending && <div className="mt-3">Check Wallet...</div>}
      {signature && (
        <Alert className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="truncate">Signature: {signature}</p>
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
