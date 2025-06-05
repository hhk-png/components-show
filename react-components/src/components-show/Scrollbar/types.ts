import { ReactNode } from "react"

export interface ScrollbarProps {
  children: ReactNode
  height?: string | number
  width?: string | number
  thumbSize?: number
  scrollSpeed?: number
  className?: string
}