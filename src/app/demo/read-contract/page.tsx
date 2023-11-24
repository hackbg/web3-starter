import { ReadContracts } from '@/components/read-contracts'
import { ReadContractsInfinite } from '@/components/read-contracts-infinite'
import { CardSkeleton } from '@/components/card-skeleton'
import { ClientOnly } from '@/components/client-only'
import { Connected } from '@/components/connected'
import { ConnectButton } from '@/components/connect-button'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Page() {
  return (
    <>
      <PageHeader className="pb-8">
        <PageHeaderHeading>Read Contract</PageHeaderHeading>
        <PageHeaderDescription>
          Reading from a smart contract&apos;s state.
        </PageHeaderDescription>
      </PageHeader>

      <ClientOnly
        fallback={
          <div className="mb-4 md:w-[720px]">
            <CardSkeleton />
          </div>
        }
      >
        <Connected
          fallback={
            <div className="pl-4">
              <ConnectButton />
            </div>
          }
        >
          <Card className="mb-4 md:w-[720px]">
            <CardHeader>
              <CardTitle>Read Contract</CardTitle>
            </CardHeader>
            <CardContent>
              <ReadContracts />
            </CardContent>
          </Card>

          <Card className="mb-4 md:w-[720px]">
            <CardHeader>
              <CardTitle>Read Contract Infinite</CardTitle>
            </CardHeader>
            <CardContent>
              <ReadContractsInfinite />
            </CardContent>
          </Card>
        </Connected>
      </ClientOnly>
    </>
  )
}
