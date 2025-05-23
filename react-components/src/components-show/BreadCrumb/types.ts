import { ReactNode } from "react"

export type BreadCrumbProps = {
  homeElement: ReactNode
  activePath: string
  pathNames: string[]
  saparator?: ReactNode
  onClickElement?: (path: string) => void
}
