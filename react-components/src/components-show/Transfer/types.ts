export interface TransferProps {
  left: number[]
  right: number[]
  onChange: (left: number[], right: number[]) => void
  initialChecked?: number[]
}