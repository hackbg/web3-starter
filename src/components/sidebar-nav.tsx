'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SidebarNavItem } from '@/types'
import { cn } from '@/lib/utils'

export interface DemoSidebarNavProps {
  items: SidebarNavItem[]
  onOpenChange?: (open: boolean) => void
}

export function DemoSidebarNav({ items, onOpenChange }: DemoSidebarNavProps) {
  const pathname = usePathname()

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn('pb-8')}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-bold">
            {item.title}
          </h4>
          {item.items ? (
            <DemoSidebarNavItems
              items={item.items}
              pathname={pathname}
              onOpenChange={(open) => onOpenChange?.(open)}
            />
          ) : null}
        </div>
      ))}
    </div>
  ) : null
}

interface DemoSidebarNavItemsProps {
  items: SidebarNavItem[]
  pathname: string | null
  onOpenChange?: (open: boolean) => void
}

export function DemoSidebarNavItems({
  items,
  pathname,
  onOpenChange,
}: DemoSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        !item.disabled && item.href ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              'flex w-full items-center rounded-md p-2 hover:underline',
              {
                'bg-muted': pathname === item.href,
              },
            )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
            onClick={() => onOpenChange?.(false)}
          >
            {item.title}
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60"
          >
            {item.title}
          </span>
        ),
      )}
    </div>
  ) : null
}
