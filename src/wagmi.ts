import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { sepolia, mainnet } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'web3-starter',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
  chains: [sepolia, mainnet],
  transports: { [sepolia.id]: http(), [mainnet.id]: http() },
})
