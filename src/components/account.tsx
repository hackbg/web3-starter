'use client'

import { useAccount, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  return (
    <p className='text-sm md:text-base'>
      {ensName ?? address}
      {ensName ? ` (${address})` : null}
    </p>
  )
}
