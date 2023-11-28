'use client'

import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

import Scrt from '@fadroma/scrt'

const Context = React.createContext({
  scrt: new Scrt.testnet()
})

const { Provider } = Context

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <Provider>{children}</Provider>
}
