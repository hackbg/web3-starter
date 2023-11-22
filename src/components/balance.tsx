'use client'

import { useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAddress } from 'viem'
import type { Address } from 'wagmi'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

const isValidAddress = (value: unknown) => isAddress(value as string)

const formSchema = z.object({
  address: z.custom<string>(isValidAddress, 'Invalid Address'),
})

export function AccountBalance() {
  const { address } = useAccount()
  const { data, refetch } = useBalance({
    address,
    watch: true,
  })

  return (
    <>
      <div>{data?.formatted}</div>
      <Button className="mt-4" variant="outline" onClick={() => refetch()}>
        Refetch
      </Button>
    </>
  )
}

export function FindBalance() {
  const [address, setAddress] = useState('')
  const { data, isLoading, refetch } = useBalance({
    address: address as Address,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.address === address) {
      refetch()
    } else {
      setAddress(values.address)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Wallet address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline">
            {isLoading ? 'Fetching...' : 'Fetch'}
          </Button>
        </form>
      </Form>
      <div className="mt-4">{data?.formatted}</div>
    </>
  )
}
