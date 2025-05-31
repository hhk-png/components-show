import React from 'react'
import { DisContinuousProps } from './types'

const DisContinuous: React.FC<DisContinuousProps> = ({
  step,
  currentStep,
}: DisContinuousProps) => {
  return (
    <div className='inline-block relative'>
      <span className='absolute left-1/2 -translate-x-1/2 bottom-6
      text-[#6a1b9a] font-bold'>
        {currentStep}/{step}
      </span>
      {Array.from({ length: step }, (_, i) => i + 1).map((s) => (
        <div
          key={s}
          className={`inline-block h-5 w-5 rounded mr-[1px] ${
            s <= currentStep ? 'bg-[#6a1b9a]' : 'bg-[#e0e0de]'
          }`}
        />
      ))}
    </div>
  )
}

export default DisContinuous
