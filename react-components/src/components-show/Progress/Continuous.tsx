import React from 'react'

interface ContinuousProgressProps {
  ratio: number
  bgcolor?: string
}

const ContinuousProgress: React.FC<ContinuousProgressProps> = ({
  bgcolor = '#6a1b9a',
  ratio,
}) => {
  return (
    <div className='h-5 w-full bg-[#e0e0de] rounded-full inline-block'>
      <div
        className='h-full rounded-full relative'
        style={{ width: `${ratio}%`, backgroundColor: bgcolor }}
      >
        <span className='absolute right-2 -top-[2px] text-white font-bold'>{ratio}%</span>
      </div>
    </div>
  )
}

export default ContinuousProgress
