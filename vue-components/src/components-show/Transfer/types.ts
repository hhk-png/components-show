
export interface TransferProps {
  left: number[]
  right: number[]
  initialChecked?: number[]
}

export interface TransferEmits {
  (e: 'update:left', value: number[]): void
  (e: 'update:right', value: number[]): void
}
