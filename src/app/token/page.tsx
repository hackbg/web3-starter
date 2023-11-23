import { Token } from '@/components/token'
import { BalanceOf, TotalSupply } from '@/components/read-contract'
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
        <PageHeaderHeading>Token</PageHeaderHeading>
        <PageHeaderDescription>
          Interacting with an ERC20 token.
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
              <CardTitle>Token Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <BalanceOf />
            </CardContent>
          </Card>

          <Card className="mb-4 md:w-[720px]">
            <CardHeader>
              <CardTitle>Token Total Supply</CardTitle>
            </CardHeader>
            <CardContent>
              <TotalSupply />
            </CardContent>
          </Card>

          <Card className="mb-4 md:w-[720px]">
            <CardHeader>
              <CardTitle>Token</CardTitle>
            </CardHeader>
            <CardContent>
              <Token />
            </CardContent>
          </Card>
        </Connected>
      </ClientOnly>
    </div>
  )
}
