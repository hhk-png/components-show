export type Col = Record<string, any>
export type DataSource = Col[]

export interface ColumnMeta {
  code: string
  name: string
  width: number
}

export interface VirtualTableProps {
  dataSource: DataSource
  ColumnMetas: ColumnMeta[]
}
