'use client'

import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

import { chains, config } from '../wagmi'

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  )
}
