'use client'
import * as React from 'react'
import * as Scrt from '@fadroma/scrt'
//import { WagmiConfig } from 'wagmi'
//import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
//import { chains, config } from '../wagmi'

export interface IContext {
  scrt?:   Scrt.default
  height:  number
  update:  ()=>Promise<void>
  connect: ()=>Promise<void>
}

const stub = () => { throw new Error('this function stub should be unreachable') }

export const FadromaContext = React.createContext<IContext>({
  height:  -Infinity,
  update:  stub,
  connect: stub,
})

export const useFadromaContext = () => React.useContext(
  FadromaContext
)

export const {
  Provider: FadromaProvider,
  Consumer: FadromaConsumer,
} = FadromaContext

export function Providers (props: { children: React.ReactNode }) {
  console.warn('render Providers')
  const scrt = Scrt.testnet()
  const [height, setHeight] = React.useState(-Infinity)
  const context = {
    scrt,
    height,
    update: async () => {
      scrt.height.then(h=>setHeight(h))
    },
    connect: async () => {
      console.log(Scrt)
    }
  }
  context.update()
  return (
    //<WagmiConfig config={config}>
      //<RainbowKitProvider chains={chains}>
        <FadromaContext.Provider value={context}>{props.children}</FadromaContext.Provider>
      //</RainbowKitProvider>
    //</WagmiConfig>
  )
}

export const LocalStateContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [predictions, setPredictionsState] = React.useState<Prediction[]>([])
  const [error, setError] = React.useState('')
  const [tab, setTab] = React.useState('betslip')
  const setPredictions = (predictions: Prediction[]) => {
    if (predictions.some((p) => liveGameStatuses.includes(p.game.status))) {
      setError('You cannot make predictions for live Games')
      setTimeout(() => setError(''), 5000)
      return
    }
    setPredictionsState(predictions)
  }
  return (
    <LocalStateContext.Provider
      value={{ predictions, error, setPredictions, tab, setTab }}
    >
      {children}
    </LocalStateContext.Provider>
  )
}
