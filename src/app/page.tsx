import Link from 'next/link'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Icons } from '@/components/icons'
import { Account } from '@/components/account'
import { AccountBalance, FindBalance } from '@/components/balance'
import { BlockNumber } from '@/components/block-number'
import { Connected } from '@/components/connected'
import { NetworkSwitcher } from '@/components/network-switcher'
import { TotalSupply, BalanceOf } from '@/components/read-contract'
import { ReadContracts } from '@/components/read-contracts'
import { ReadContractsInfinite } from '@/components/read-contracts-infinite'
import { SendTransaction } from '@/components/send-transaction'
import { SendTransactionPrepared } from '@/components/send-transaction-prepared'
import { SignMessage } from '@/components/sign-message'
import { SignTypedData } from '@/components/sign-typed-data'
import { Token } from '@/components/token'
import { WatchContractEvents } from '@/components/watch-contract-events'
import { WatchPendingTransactions } from '@/components/watch-pending-transactions'
import { WriteContract } from '@/components/write-contract'
import { WriteContractPrepared } from '@/components/write-contract-prepared'

export function Page() {
  return (
    <div className="container relative pb-10">
      <PageHeader>
        <PageHeaderHeading>Web3 Starter</PageHeaderHeading>
        <PageHeaderDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </PageHeaderDescription>
        <div className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
          <Link href="/" className={cn(buttonVariants())}>
            Get Started
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </div>
      </PageHeader>

      <Connected>
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

        <Card className="mb-4 md:w-[720px]">
          <CardHeader>
            <CardTitle>Block Number</CardTitle>
          </CardHeader>
          <CardContent>
            <BlockNumber />
          </CardContent>
        </Card>

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
            <CardTitle>Read Contracts</CardTitle>
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

        <Card className="mb-4 md:w-[720px]">
          <CardHeader>
            <CardTitle>Sign Message</CardTitle>
          </CardHeader>
          <CardContent>
            <SignMessage />
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

        <Card className="mb-4 md:w-[720px]">
          <CardHeader>
            <CardTitle>Sign Typed Data</CardTitle>
          </CardHeader>
          <CardContent>
            <SignTypedData />
          </CardContent>
        </Card>

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
    </div>
  )
}

export default Page
