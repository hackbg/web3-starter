import { DemoConfig } from '@/types'

export const demoConfig: DemoConfig = {
  sidebarNav: [
    {
      title: 'Basics',
      items: [
        {
          title: 'Network',
          href: '/demo/network',
        },
        {
          title: 'Account',
          href: '/demo/account',
        },
      ],
    },
    {
      title: 'Read',
      items: [
        {
          title: 'Contract',
          href: '/demo/read-contract',
        },
        {
          title: 'Token',
          href: '/demo/token',
        },
        {
          title: 'Watch',
          href: '/demo/watch',
        },
      ],
    },
    {
      title: 'Write',
      items: [
        {
          title: 'Contract',
          href: '/demo/write-contract',
        },
        {
          title: 'Transaction',
          href: '/demo/send-tx',
        },
        {
          title: 'Sign',
          href: '/demo/sign',
        },
      ],
    },
  ],
}
