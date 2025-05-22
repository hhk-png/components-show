import type { StepProps } from './types'
import React from 'react'

const Step: React.FC<StepProps> = ({
  stepData,
  stepActive,
  direction,
  stepClick,
}) => {
  const isVertical = direction === 'vertical'

  const getStepClass = (index: number) => {
    if (stepActive - 1 > index) {
      return 'text-gray-900'
    }
    if (stepActive - 1 === index) {
      return 'text-orange-500'
    }
    return 'text-gray-500'
  }

  const getCircleClass = (index: number) => {
    if (stepActive - 1 > index)
      return 'bg-green-700 border-green-200'
    if (stepActive - 1 === index)
      return 'bg-orange-500 border-orange-200'
    return 'bg-gray-500 border-gray-300'
  }

  const lineStyle = isVertical
    ? { height: `${(stepData.length - 1) * 100}px` }
    : { width: `${(stepData.length - 1) * 160}px` }

  const progressStyle = isVertical
    ? { height: `${Math.min(stepActive - 1, stepData.length - 1) * 100}px` }
    : { width: `${Math.min(stepActive - 1, stepData.length - 1) * 160}px` }

  return (
    <div className={`relative mb-2 ${isVertical ? 'flex flex-col' : 'flex'}`}>
      {stepData.map((item, index) => (
        <div
          key={index}
          className={`z-10 text-center cursor-pointer ${
            isVertical ? 'h-25' : 'w-40'
          } ${getStepClass(index)}`}
          onClick={() => stepClick?.(index)}
        >
          <div
            className={`w-7 h-7 mx-auto flex items-center justify-center 
              rounded-full font-bold text-white text-sm 
              ${getCircleClass(index)}`}
          >
            {stepActive - 1 > index
              ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/success.svg`}
                    alt="Success"
                  />
                )
              : (
                  <span>{index + 1}</span>
                )}
          </div>
          <div className="text-base leading-10 h-10">{item.status}</div>
        </div>
      ))}

      {/* 背景线 */}
      <div
        className={`absolute bg-gray-300 ${
          isVertical
            ? 'w-1 left-1/2 -translate-x-1/2 top-7'
            : 'top-3 h-1 left-20'
        }`}
        style={lineStyle}
      >
      </div>

      {/* 进度线 */}
      <div
        className={`absolute bg-green-700 z-5 ${
          isVertical
            ? 'w-1 left-1/2 -translate-x-1/2 top-7'
            : 'top-3 h-1 left-20'
        }`}
        style={progressStyle}
      >
      </div>
    </div>
  )
}

export default Step
