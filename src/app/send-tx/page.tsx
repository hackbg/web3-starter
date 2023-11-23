import { SendTransaction } from '@/components/send-transaction'
import { SendTransactionPrepared } from '@/components/send-transaction-prepared'
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
    <div className="container relative pb-10">
      <PageHeader className="pb-8">
        <PageHeaderHeading>Send Transaction</PageHeaderHeading>
        <PageHeaderDescription>
          Send transactions to an Ethereum account.
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
              <CardTitle>Send Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <SendTransaction />
            </CardContent>
          </Card>

          <Card className="mb-4 md:w-[720px]">
            <CardHeader>
              <CardTitle>Send Transaction (Prepared)</CardTitle>
            </CardHeader>
            <CardContent>
              <SendTransactionPrepared />
            </CardContent>
          </Card>
        </Connected>
      </ClientOnly>
    </div>
  )
}
