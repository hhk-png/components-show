
export interface TourStep {
  target: string // CSS selector
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export interface TourProps {
  steps: TourStep[]
}

export interface TourEmits {
  (e: 'finish'): void
  (e: 'skip'): void
}
