'use client'

import { useContractReads } from 'wagmi'

import { wagmiContractConfig } from '@/config/contracts'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

const contractReads = [
  {
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
  },
  {
    ...wagmiContractConfig,
    functionName: 'name',
  },
  {
    ...wagmiContractConfig,
    functionName: 'totalSupply',
  },
]

export function ReadContracts() {
  const { data, isSuccess, isLoading } = useContractReads({
    contracts: contractReads,
  })

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <Table>
          <TableCaption>A list of contract method calls.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((data, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">
                  {contractReads[idx].functionName}
                </TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell>{data.result?.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
