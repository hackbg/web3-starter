'use client'

import { useInfiniteReadContracts } from 'wagmi'

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
  const result = useInfiniteReadContracts({
    cacheKey: 'wagmiTokenURIs',
    contracts(pageParam) {
      return [...new Array(5)].map(
        (_, i) =>
          ({
            ...wagmiContractConfig,
            functionName: 'ownerOf',
            args: [BigInt(pageParam + i)],
          }) as const,
      )
    },
    query: {
      initialPageParam: 0,
      getNextPageParam(_lastPage, _allPages, lastPageParam) {
        return lastPageParam + 5
      },
    },
  })
  const { data, isLoading, isSuccess, fetchNextPage } =
    useInfiniteReadContracts({
      cacheKey: 'wagmiTokenURIs',
      contracts(pageParam) {
        return [...new Array(5)].map(
          (_, i) =>
            ({
              ...wagmiContractConfig,
              functionName: 'ownerOf',
              args: [BigInt(pageParam + i)],
            }) as const,
        )
      },
      query: {
        initialPageParam: 0,
        getNextPageParam(_lastPage, _allPages, lastPageParam) {
          return lastPageParam + 5
        },
      },
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
              {/* TODO: find a fix for the wrong data type */}
              {/* @ts-ignore */}
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
