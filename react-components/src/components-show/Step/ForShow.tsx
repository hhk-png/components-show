import React, { useState } from 'react'
import Step from './Step'

type StepDirection = 'horizontal' | 'vertical'

interface StepItem {
  status: string
}

const StepContainer: React.FC = () => {
  const [direction, setDirection] = useState<StepDirection>('horizontal')
  const [stepActive, setStepActive] = useState<number>(2)
  const [stepData] = useState<StepItem[]>([
    { status: 'Step 1' },
    { status: 'Step 2' },
    { status: 'Step 3' },
  ])

  const activeChange = (index: number) => {
    setStepActive(index + 1)
  }

  const directionChange = (newDirection: StepDirection) => {
    setDirection(newDirection)
  }

  return (
    <div className="flex items-center h-[50vh]">
      {/* button */}
      <div className="basis-1/4 flex flex-col items-center justify-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
          onClick={() => directionChange('horizontal')}
        >
          Horizontal
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => directionChange('vertical')}
        >
          Vertical
        </button>
      </div>
      {/* show */}
      <div className="w-150">
        <Step
          direction={direction}
          stepActive={stepActive}
          stepData={stepData}
          stepClick={activeChange}
        />
      </div>
    </div>
  )
}

export default StepContainer
