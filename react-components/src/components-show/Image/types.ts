export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export interface ImageProps {
  src: string
  alt?: string
  fit?: ImageFit
  lazy?: boolean
  scrollContainer?: string | HTMLElement
  className?: string
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void
  onError?: (error: Error) => void
  placeholder?: React.ReactNode
  fallback?: React.ReactNode
}
