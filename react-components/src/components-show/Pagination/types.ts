export interface UsePaginationProps {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
}

export type PaginationLogicProps = UsePaginationProps & {
  onPageChange?: (page: number) => void
  className?: string
}

export interface PaginationProps {
  data: { [key: string]: any }[]
  pageSize?: number
  colNames?: string[]
}
