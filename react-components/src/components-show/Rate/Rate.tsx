// Rate.tsx
import React, { useState } from 'react'
import StarIcon from './Star'
import { RateProps } from './types'

const Rate: React.FC<RateProps> = ({
  score,
  disabled = false,
  showText = false,
  onScoreChange,
}) => {
  const [curScore, setCurScore] = useState<number>(0)

  const handleClick = (val: number) => {
    if (!disabled && onScoreChange) {
      onScoreChange(val)
    }
  }

  const displayScore = curScore || score

  return (
    <div
      className={`flex items-center space-x-2 ${
        disabled ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      {showText && (
        <span className='text-orange-500 font-bold text-lg'>{score}分</span>
      )}
      <div className='flex space-x-1'>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className='w-6 h-6 cursor-pointer'
            onMouseEnter={() => !disabled && setCurScore(i)}
            onMouseLeave={() => !disabled && setCurScore(0)}
            onClick={() => handleClick(i)}
          >
            <StarIcon
              color={i <= Math.floor(displayScore) ? 'yellow' : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Rate
