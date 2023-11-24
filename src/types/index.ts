export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavItem[]
    }
)

export type DemoConfig = {
  sidebarNav: SidebarNavItem[]
}
