import { WriteContract } from '@/components/write-contract'
import { WriteContractPrepared } from '@/components/write-contract-prepared'
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
        <PageHeaderHeading>Write Contract</PageHeaderHeading>
        <PageHeaderDescription>
          Send transactions to a smart contract.
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
              <CardTitle>Write Contract</CardTitle>
            </CardHeader>
            <CardContent>
              <WriteContract />
            </CardContent>
          </Card>

          <Card className="mb-4 md:w-[720px]">
            <CardHeader>
              <CardTitle>Write Contract (Prepared)</CardTitle>
            </CardHeader>
            <CardContent>
              <WriteContractPrepared />
            </CardContent>
          </Card>
        </Connected>
      </ClientOnly>
    </>
  )
}
