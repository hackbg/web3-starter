'use client'

import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

import { chains, config } from '../wagmi'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
