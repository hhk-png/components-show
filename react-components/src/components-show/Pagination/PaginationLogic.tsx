import { useMemo } from 'react'
import type { PaginationLogicProps } from './types'
import { DOTS, usePagination } from './usePagination'

const PaginationLogic = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}: PaginationLogicProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange?.(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange?.(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  const [paginationItemBaseClass, arrowBaseClass] = useMemo(() => {
    return [
      'flex items-center justify-center px-3 h-8 mx-1 my-auto text-black/90 tracking-[0.01071em] text-4 leading-[1.43] min-w-9 rounded-full',
      'arrow w-2 h-2 inline-block border-r-1 border-t-1 border-black/90',
    ]
  }, [])

  const arrowHoverClass = (current: number, target: number) => {
    return current === target
      ? 'pointer-events-none cursor-default'
      : 'hover:bg-black/5 cursor-pointer'
  }

  return (
    <ul className={`flex mt-1 select-none ${className || ''}`}>
      {/* Left Arrow */}
      <li
        className={`${paginationItemBaseClass} ${arrowHoverClass(
          currentPage,
          1
        )}`}
        onClick={onPrevious}
      >
        <div className={`${arrowBaseClass} rotate-[-135deg]`} />
      </li>

      {/* Pagination Items */}
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={`${pageNumber}-${idx}`}
              className={`${paginationItemBaseClass} cursor-default`}
            >
              &#8230;
            </li>
          )
        }

        return (
          <li
            className={`${paginationItemBaseClass} cursor-pointer hover:bg-black/5 ${
              pageNumber === currentPage ? 'bg-black/10' : ''
            }`}
            key={`${pageNumber}-${idx}`}
            onClick={() => onPageChange?.(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}

      {/* Right Arrow */}
      <li
        className={`${paginationItemBaseClass} ${arrowHoverClass(
          currentPage,
          lastPage
        )}`}
        onClick={onNext}
      >
        <div className={`${arrowBaseClass} rotate-[45deg]`} />
      </li>
    </ul>
  )
}

export default PaginationLogic
