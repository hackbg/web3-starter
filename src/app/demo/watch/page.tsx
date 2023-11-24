import { WatchContractEvents } from '@/components/watch-contract-events'
import { WatchPendingTransactions } from '@/components/watch-pending-transactions'
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
        <PageHeaderHeading>Watch</PageHeaderHeading>
        <PageHeaderDescription>
          Watching the network for events and transactions.
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
              <CardTitle>Watch Contract Events</CardTitle>
            </CardHeader>
            <CardContent>
              <WatchContractEvents />
            </CardContent>
          </Card>

          <Card className="mb-4 md:w-[720px]">
            <CardHeader>
              <CardTitle>Watch Pending Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <WatchPendingTransactions />
            </CardContent>
          </Card>
        </Connected>
      </ClientOnly>
    </>
  )
}
