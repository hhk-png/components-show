import React from 'react'
import type { TimelineItem } from './types'

const TimelineItem: React.FC<{
  data: TimelineItem
  index: number
}> = ({ data, index }) => (
  <div
    className={`flex pr-8 relative my-2 w-1/2 ${
      index % 2 === 0 ? 'self-end justify-start pl-8 pr-0' : 'justify-end'
    }`}
  >
    <div
      className={`
        relative flex flex-col
        max-w-[70%] w-[400px] bg-white p-2 rounded shadow 
        ${index % 2 === 0 ? 'items-start text-left' : 'items-end  text-right'}
      `}
    >
      {/* category */}
      <span
        className={`
          absolute top-2 px-2 py-2 text-xs font-bold 
          uppercase tracking-wider text-white 
          ${index % 2 === 0 ? 'right-2' : 'left-2'}
        `}
        style={{ background: data.category.color }}
      >
        {data.category.tag}
      </span>

      {/* time */}
      <time className='text-xs text-gray-500 font-bold mt-2'>{data.date}</time>

      {/* text */}
      <p className='text-base leading-6 my-4 max-w-[250px]'>{data.text}</p>

      {/* read more */}
      {data.link && (
        <a
          href={data.link.url}
          target='_blank'
          rel='noopener noreferrer'
          className="text-sm font-bold after:content-['_►'] after:text-xs"
        >
          {data.link.text}
        </a>
      )}

      {/* 圈圈 */}
      <span
        className={`
          absolute top-1/2 -translate-y-1/2  w-6 h-6 
          rounded-full border-3 border-[#e17b77] bg-white z-[100] 
          ${index % 2 === 0 ? '-left-11' : '-right-11'}
        `}
      />
    </div>
  </div>
)

export const Timeline: React.FC<{ data: TimelineItem[] }> = ({ data }) =>
  data.length > 0 && (
    <div
      className="flex flex-col relative my-10 
      before:content-[''] before:absolute before:left-1/2 
      before:-translate-x-1 before:w-1 before:h-full 
      before:bg-[#e17b77]"
    >
      {data.map((data, idx) => (
        <TimelineItem data={data} index={idx} key={idx} />
      ))}
    </div>
  )
