
export type VirtualTableProps = {
  rowCount: number
  colCount: number
  rowHeight: number
  colWidths: number[] // 支持每列不同宽度
  width: number
  height: number
  headers?: string[]
  cellRenderer: (rowIndex: number, colIndex: number) => React.ReactNode
}

