import { Account } from '@/components/account'
import { AccountBalance, FindBalance } from '@/components/balance'
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
        <PageHeaderHeading>Account</PageHeaderHeading>
        <PageHeaderDescription>
          Interacting with an Ethereum account.
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
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
              <Account />
            </CardContent>
          </Card>

          <Card className="mb-4 md:w-[720px]">
            <CardHeader>
              <CardTitle>Account Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <AccountBalance />
            </CardContent>
          </Card>

          <Card className="mb-4 md:w-[720px]">
            <CardHeader>
              <CardTitle>Find Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <FindBalance />
            </CardContent>
          </Card>
        </Connected>
      </ClientOnly>
    </>
  )
}
