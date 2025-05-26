export interface Segment {
  label: string
  value: string
}

export interface SegmentedControlProps {
  name?: string
  segments: Segment[]
  defaultIndex: number
}

export interface SegmentedControlEmits {
  (event: 'select', selectedSegment: string, index: number): void
}
