export interface StepItem {
  status: string
}

export type StepDirection = 'horizontal' | 'vertical'

export interface StepProps {
  stepData: StepItem[]
  stepActive: number
  direction?: StepDirection
  stepClick?: (index: number) => void
}
