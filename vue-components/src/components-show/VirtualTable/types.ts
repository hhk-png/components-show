export interface VirtualTableProps {
  rowCount: number
  colCount: number
  rowHeight: number
  colWidths: number[]
  width: number
  height: number
  headers?: string[]
  cellRenderer: (row: number, col: number) => string
}
