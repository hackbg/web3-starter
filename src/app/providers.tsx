'use client'
import * as React from 'react'
import * as Scrt from '@fadroma/scrt'
//import { WagmiConfig } from 'wagmi'
//import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
//import { chains, config } from '../wagmi'

export interface IContext {
  scrt?:   Scrt.default
  height:  number
  connect: ()=>Promise<void>
}

const stub = () => { throw new Error('this placeholder should be unreachable') }

export const FadromaContext = React.createContext<IContext>({
  height:  -Infinity,
  connect: stub,
})

export const useFadromaContext = () => React.useContext(
  FadromaContext
)

export const {
  Provider: FadromaProvider,
  Consumer: FadromaConsumer,
} = FadromaContext

const testnet = Scrt.testnet()

export function Providers (props: { children: React.ReactNode }) {
  console.log('render')
  const [connection, setConnection] = React.useState(testnet)
  const [identity,   setIdentity]   = React.useState(null)
  const [height,     setHeight]     = React.useState(-Infinity)
  React.useEffect(()=>{
    const update = async () => {
      const t0 = performance.now()
      setHeight(await connection.height)
      console.debug('update in', performance.now() - t0)
      timer = setTimeout(update, 2500)
    }
    let timer = setTimeout(update, 0)
    return () => clearTimeout(timer)
  }, [connection])
  const context = {
    connection,
    identity,
    height,
    connect: async () => {
      console.log(Scrt)
    }
  }
  //context.update()

  return (
    //<WagmiConfig config={config}>
      //<RainbowKitProvider chains={chains}>
        <FadromaContext.Provider value={context}>{props.children}</FadromaContext.Provider>
      //</RainbowKitProvider>
    //</WagmiConfig>
  )
}
