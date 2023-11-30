import Link from 'next/link'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Icons } from '@/components/icons'
import { ChainCard } from '@/app/providers'

export default function Page() {
  return (
    <div className="container relative pb-10">
      <PageHeader>
        <PageHeaderHeading>Web3 Starter</PageHeaderHeading>
        <PageHeaderDescription>
          Create Ethereum dApps optimized for user and developer experience.
        </PageHeaderDescription>
        <div className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ChainCard chainId="secret-4" />
            <ChainCard chainId="pulsar-3" />
            <ChainCard chainId="okp4-nemeton-1" />
          </div>

          <Link href="/demo" className={cn(buttonVariants())}>
            Go to Demo
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
    </div>
  )
}
