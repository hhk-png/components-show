import { useState } from 'react'
import { TransferProps } from './types'

function not<T>(a: T[], b: T[]): T[] {
  return a.filter((value) => !b.includes(value))
}

function intersection<T>(a: T[], b: T[]): T[] {
  return a.filter((value) => b.includes(value))
}

function Transfer({
  left = [],
  right = [],
  onChange,
  initialChecked = [],
}: TransferProps) {
  const [checked, setChecked] = useState<number[]>([...initialChecked])

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleAllRight = () => {
    onChange([], [...right, ...left])
  }

  const handleCheckedRight = () => {
    onChange(not(left, leftChecked), [...right, ...leftChecked])
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    onChange([...left, ...rightChecked], not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleAllLeft = () => {
    onChange([...left, ...right], [])
  }

  const customList = (items: number[]) => (
    <div className='w-52 h-44 overflow-y-auto border rounded shadow p-2'>
      <ul className='space-y-1'>
        {items.map((value) => {
          const isChecked = checked.includes(value)
          return (
            <li
              key={value}
              onClick={handleToggle(value)}
              className={`flex items-center p-1 cursor-pointer rounded hover:bg-green-100 ${
                isChecked ? 'bg-green-200' : ''
              }`}
            >
              <input
                type='checkbox'
                checked={isChecked}
                readOnly
                className='mr-2 accent-green-600'
              />
              <span>{`Item ${value}`}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <div className='text-center p-4'>
      <div className='flex justify-center items-center gap-6'>
        {customList(left)}

        <div className='flex flex-col space-y-2'>
          <button
            onClick={handleAllRight}
            disabled={left.length === 0}
            className='bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50'
          >
            ≫
          </button>
          <button
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            className='border border-green-500 text-green-700 px-3 py-1 rounded disabled:opacity-50'
          >
            &gt;
          </button>
          <button
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            className='border border-green-500 text-green-700 px-3 py-1 rounded disabled:opacity-50'
          >
            &lt;
          </button>
          <button
            onClick={handleAllLeft}
            disabled={right.length === 0}
            className='bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50'
          >
            ≪
          </button>
        </div>

        {customList(right)}
      </div>
    </div>
  )
}

export default Transfer
