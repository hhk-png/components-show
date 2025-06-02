import React, { useMemo, useState } from 'react'
import PaginationLogic from './PaginationLogic'
import { PaginationProps } from './types'

const Pagination: React.FC<PaginationProps> = ({
  data,
  pageSize = 10,
  colNames,
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage])

  return (
    <div className='w-full flex flex-col items-center'>
      <table className='w-full border-collapse'>
        <thead>
          <tr>
            {colNames?.map((name, idx) => {
              return (
                <th className='font-bold text-left bg-[#fafafa] p-2' key={idx}>
                  {name}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item, idx) => {
            return (
              <tr
                key={item.id}
                className={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
              >
                {Object.keys(item).map((key: any) => {
                  return (
                    <td key={key} className='border-b border-gray-200 p-2'>
                      {item[key]}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <PaginationLogic
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  )
}

export default Pagination
