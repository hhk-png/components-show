export interface Segment {
  label: string
  value: string
}

export interface SegmentedControlProps {
  name?: string
  segments: Segment[]
  onSelect: (selectedSegment: string, index: number) => void
  defaultIndex: number
}
