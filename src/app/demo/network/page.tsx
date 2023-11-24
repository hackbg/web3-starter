import { NetworkSwitcher } from '@/components/network-switcher'
import { BlockNumber } from '@/components/block-number'
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
        <PageHeaderHeading>Network</PageHeaderHeading>
        <PageHeaderDescription>
          Interacting with the Ethereum network.
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
          <Card className="my-4 md:w-[720px]">
            <CardHeader>
              <CardTitle>Network</CardTitle>
            </CardHeader>
            <CardContent>
              <NetworkSwitcher />
            </CardContent>
          </Card>

          <Card className="mb-4 md:w-[720px]">
            <CardHeader>
              <CardTitle>Block Number</CardTitle>
            </CardHeader>
            <CardContent>
              <BlockNumber />
            </CardContent>
          </Card>
        </Connected>
      </ClientOnly>
    </>
  )
}
