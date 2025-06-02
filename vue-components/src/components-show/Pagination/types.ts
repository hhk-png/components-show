export interface UsePaginationProps {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
}

export type PaginationLogicProps = UsePaginationProps & {
  className?: string
}

export interface PaginationLogicEmits {
  (e: 'pageChange', page: number): void
} 

export interface PaginationProps {
  data: { [key: string]: any }[]
  pageSize?: number
  colNames?: string[]
}
