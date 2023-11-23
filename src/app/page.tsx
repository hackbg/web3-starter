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

export default function Page() {
  return (
    <div className="container relative pb-10">
      <PageHeader>
        <PageHeaderHeading>Web3 Starter</PageHeaderHeading>
        <PageHeaderDescription>
          Create Ethereum dApps optimized for user and developer experience.
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
    </div>
  )
}
