'use client'
import * as React from 'react'
import { Scrt, CW } from '@hackbg/fadroma'
import type { Connection, Identity } from '@hackbg/fadroma'
export function Providers (props: { children: React.ReactNode }) {
  return props.children
}
export interface IFadroma {
  connection?: Connection
  identity?:   Identity
  okp4?:       CW.OKP4.OKP4Connection
  height:      number
}
const noContext = {
  height:  -Infinity,
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
  const [connection, setConnection] = React.useState<Connection|undefined>()
  const [identity,   setIdentity]   = React.useState()
  const [height,     setHeight]     = React.useState(-Infinity)
  React.useEffect(function connect () {
    if (props.id === 'secret-4') {
      setConnection(Scrt.mainnet())
    } else if (props.id === 'pulsar-3') {
      setConnection(Scrt.testnet())
    } else if (props.id === 'okp4-nemeton-1') {
      setConnection(CW.OKP4.testnet())
    } else {
      throw new Error(`unsupported chain id ${props.id}`)
    }
  }, [props.id])
  React.useEffect(function pollHeight () {
    console.log('init poll height')
    let timer = setTimeout(async function update () {
      if (connection) {
        console.debug('updating', connection.chainId)
        const t0 = performance.now()
        setHeight(await connection.height)
        console.debug('update in', performance.now() - t0)
      } else {
        console.warn(`can't update ${props.id}, no connection`)
      }
      timer = setTimeout(update, 2500)
    }, 0)
    return () => clearTimeout(timer)
  }, [connection, props.id])
  const context = {connection, identity, height}
  return <Provider value={context}>{props.children}</Provider>
}
export function ChainCard (props: { chainId: keyof typeof fadromas }) {
  return <FadromaProvider id={props.chainId}><ChainCardInner {...props} /></FadromaProvider>
}
function ChainCardInner (props: { chainId: keyof typeof fadromas }) {
  const { connection, identity, height } = useFadroma(props.chainId)
  return <div className="rounded-xl p-2 border bg-card text-card-foreground shadow">
    <div><strong>{props.chainId}</strong></div>
    {(height > 0) ? <div>Height: {height}</div> : null }
  </div>
}

//import { WagmiConfig } from 'wagmi'
//import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
//import { chains, config } from '../wagmi'
