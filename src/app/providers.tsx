'use client'
import * as React from 'react'
import { Scrt, CW } from '@hackbg/fadroma'
import type { Connection, Identity } from '@hackbg/fadroma'
export function Providers (props: { children: React.ReactNode }) {
  return props.children
}
const stub = () => {
  throw new Error('this placeholder should be unreachable')
}
export interface IFadroma {
  connection?: Connection
  identity?:   Identity
  okp4?:       CW.OKP4.OKP4Connection
  height:      number
  connect:     ()=>Promise<void>
}
const noContext = {
  height:  -Infinity,
  connect: stub,
}
const createFadroma = (id: string) => React.createContext<IFadroma>(
  noContext
)
const fadromas: Record<string, ReturnType<typeof createFadroma>> = {
  'secret-4': createFadroma('secret-4'),
  'pulsar-3': createFadroma('secret-3'),
  'okp4-nemeton-1': createFadroma('okp4-nemeton-1')
}
export const useFadroma = (id: keyof typeof fadromas) => {
  if (!fadromas[id]) throw new Error(`no fadroma ${id}`)
  return React.useContext(fadromas[id])
}
export function FadromaProvider (props: {
  id: keyof typeof fadromas,
  children: React.ReactNode
}) {
  const { Provider } = fadromas[props.id]

  const [connection, setConnection] = React.useState(Scrt.testnet())
  const [identity,   setIdentity]   = React.useState()
  const [height,     setHeight]     = React.useState(-Infinity)

  React.useEffect(pollHeight, [connection])

  return <Provider value={{connection, identity, height, connect}}>
    {props.children}
  </Provider>

  function pollHeight () {
    const update = async () => {
      const t0 = performance.now()
      setHeight(await connection.height)
      console.debug('update in', performance.now() - t0)
      timer = setTimeout(update, 2500)
    }
    let timer = setTimeout(update, 0)
    return () => clearTimeout(timer)
  }

  async function connect () {
    // TODO: connect Keplr
  }
}

export function ChainCard (props: { chainId: keyof typeof fadromas }) {
  const { connection, identity, height, connect } = useFadroma(props.chainId)
  return <div className="rounded-xl border bg-card text-card-foreground shadow">
    {props.chainId}
  </div>
}

//import { WagmiConfig } from 'wagmi'
//import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
//import { chains, config } from '../wagmi'
