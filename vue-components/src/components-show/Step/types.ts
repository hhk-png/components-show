export interface StepItem {
  status: string
}

export type StepDirection = 'horizontal' | 'vertical'

export interface StepProps {
  stepData: StepItem[]
  stepActive: number
  direction?: StepDirection
}

export interface StepEmits {
  (e: 'stepClick', index: number): void
}
