export interface RateProps {
  score: number
  disabled?: boolean
  showText?: boolean
}

export interface RateEmits {
  (e: 'update:score', value: number): void
}
