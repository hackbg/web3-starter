'use client'

import { useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { formatUnits, type Address } from 'viem'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AccountBalance() {
  const { address } = useAccount()
  const { data, refetch } = useBalance({
    address,
  })

  return (
    <>
      <div>{data && formatUnits(data.value, data.decimals)}</div>
      <Button className="mt-4" variant="outline" onClick={() => refetch()}>
        Refetch
      </Button>
    </>
  )
}

export function FindBalance() {
  const [address, setAddress] = useState('')
  const { data, isLoading, refetch } = useBalance({
    address: address as Address,
  })

  const [value, setValue] = useState('')

  return (
    <>
      <div className="flex space-x-2">
        <Input
          onChange={(e) => setValue(e.target.value)}
          placeholder="Wallet address"
          value={value}
        />
        <Button
          variant="outline"
          onClick={() => (value === address ? refetch() : setAddress(value))}
        >
          {isLoading ? 'Fetching...' : 'Fetch'}
        </Button>
      </div>
      <div className="mt-4">
        {data && formatUnits(data.value, data.decimals)}
      </div>
    </>
  )
}
