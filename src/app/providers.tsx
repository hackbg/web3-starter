'use client'
import * as React from 'react'
import * as Scrt from '@fadroma/scrt'
import type Connection from '@fadroma/scrt'
//import { WagmiConfig } from 'wagmi'
//import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
//import { chains, config } from '../wagmi'

const scrt = Scrt.testnet()

console.log({scrt})

const { Provider, Consumer } = React.createContext({ scrt: null as null|Connection })

export default Consumer

export function Providers(props: { children: React.ReactNode }) {
  return (
    //<WagmiConfig config={config}>
      //<RainbowKitProvider chains={chains}>
        <Provider value={{scrt}}>{
          props.children
        }</Provider>
      //</RainbowKitProvider>
    //</WagmiConfig>
  )
}
