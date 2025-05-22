import type { ReactNode } from "react"

export interface MenuProps {
  children: ReactNode
}

export interface MenuItemProps {
  children: ReactNode
  onClick?: () => void
}

export interface SubMenuProps {
  title: string
  children: ReactNode
}
