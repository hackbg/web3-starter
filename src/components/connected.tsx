'use client'

import { useAccount } from 'wagmi'

type ConnectedProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function Connected({ children, fallback }: ConnectedProps) {
  const { isConnected } = useAccount()

  if (!isConnected) return fallback || null

  return children
}
