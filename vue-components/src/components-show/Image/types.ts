export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export interface ImageProps {
  src: string
  fit?: ImageFit
  lazy?: boolean
  scrollContainer?: HTMLElement | string
}

export interface ImageEmits {
  (e: 'load', event: Event): void
  (e: 'error', event: Event): void
}

export interface ImageSlots {
  placeholder?: (props: { isLoading: boolean }) => any
  error?: (props: { error: boolean }) => any
}