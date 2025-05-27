
export interface TourStep {
  target: string // CSS selector
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export interface TourProps {
  steps: TourStep[]
  onFinish?: () => void
  onSkip?: () => void
}
