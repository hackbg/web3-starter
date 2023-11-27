'use client'

import { paginatedIndexesConfig, useContractInfiniteReads } from 'wagmi'

import { wagmiContractConfig } from '@/config/contracts'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

export function ReadContractsInfinite() {
  const { data, isLoading, isSuccess, fetchNextPage } =
    useContractInfiniteReads({
      cacheKey: 'wagmiTokenURIs',
      ...paginatedIndexesConfig(
        (index: number) => [
          {
            ...wagmiContractConfig,
            functionName: 'ownerOf',
            args: [BigInt(index)] as const,
          },
        ],
        { start: 0, perPage: 5, direction: 'increment' },
      ),
    })

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <div className="flex flex-col">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.pages.flat().map((data, idx) => (
                <TableRow key={idx}>
                  <TableCell>{data.status}</TableCell>
                  <TableCell>{data.result?.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center">
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => fetchNextPage()}
            >
              Load More
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
