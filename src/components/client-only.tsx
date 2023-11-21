'use client'

import React, { useState, useEffect } from 'react'

type ClientOnlyProps = {
  children: React.ReactNode
}

export function ClientOnly({ children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return children
}
