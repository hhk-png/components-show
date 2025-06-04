import React, { useState, useMemo } from 'react'

type CalendarDay = {
  date: Date
  isCurrentMonth: boolean
}

const Calendar: React.FC = () => {
  const today = new Date()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())

  const [rangeStartDate, setRangeStartDate] = useState<Date | undefined>()
  const [rangeEndDate, setRangeEndDate] = useState<Date | undefined>()

  const daysInMonth = (year: number, month: number): number =>
    new Date(year, month + 1, 0).getDate()

  const getFirstDayOfMonth = (year: number, month: number): number =>
    new Date(year, month, 1).getDay()

  const isSameDate = (d1: Date, d2: Date): boolean =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()

  const isToday = (date: Date): boolean => isSameDate(date, today)

  const isInRange = (date: Date): boolean =>
    !!rangeStartDate &&
    !!rangeEndDate &&
    date >= rangeStartDate &&
    date <= rangeEndDate

  const isRangeStart = (date: Date): boolean =>
    !!rangeStartDate && isSameDate(date, rangeStartDate)

  const isRangeEnd = (date: Date): boolean =>
    !!rangeEndDate && isSameDate(date, rangeEndDate)

  const selectDate = (date: Date) => {
    if (!rangeStartDate || (rangeStartDate && rangeEndDate)) {
      setRangeStartDate(date)
      setRangeEndDate(undefined)
    } else if (!rangeEndDate) {
      if (date < rangeStartDate) {
        setRangeEndDate(rangeStartDate)
        setRangeStartDate(date)
      } else {
        setRangeEndDate(date)
      }
    }
  }

  const calendarDays: CalendarDay[] = useMemo(() => {
    const days: CalendarDay[] = []
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const prevMonthLastDate = daysInMonth(currentYear, currentMonth - 1)

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(currentYear, currentMonth - 1, prevMonthLastDate - i),
        isCurrentMonth: false,
      })
    }

    const totalDays = daysInMonth(currentYear, currentMonth)
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(currentYear, currentMonth, i),
        isCurrentMonth: true,
      })
    }

    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(currentYear, currentMonth + 1, i),
        isCurrentMonth: false,
      })
    }

    return days
  }, [currentYear, currentMonth])

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const formatDate = (date: Date | undefined) =>
    date ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` : ''

  return (
    <div className='max-w-xl mx-auto p-4'>
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <button
          onClick={prevMonth}
          className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'
        >
          ‹
        </button>
        <div className='text-lg font-semibold'>
          {currentYear}年 {currentMonth + 1}月
        </div>
        <button
          onClick={nextMonth}
          className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'
        >
          ›
        </button>
      </div>

      {/* Weekdays */}
      <div className='grid grid-cols-7 text-center font-semibold mb-2'>
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className='grid grid-cols-7 gap-1'>
        {calendarDays.map((day, index) => {
          const { date, isCurrentMonth } = day
          const isStart = isRangeStart(date)
          const isEnd = isRangeEnd(date)
          const inRange = isInRange(date)
          const today = isToday(date)

          return (
            <div
              key={index}
              onClick={() => selectDate(date)}
              className={`p-2 h-20 border rounded-lg cursor-pointer text-sm transition-all
                ${!isCurrentMonth ? 'bg-gray-100 text-gray-400' : ''}
                ${today ? 'border-blue-500 bg-blue-300' : ''}
                ${isStart ? 'bg-blue-500 font-bold text-white' : ''}
                ${isEnd ? 'bg-blue-500 font-bold text-white' : ''}
                ${
                  inRange && !isStart && !isEnd
                    ? 'bg-blue-100 text-blue-800'
                    : ''
                }
              `}
            >
              {date.getDate()}
            </div>
          )
        })}
      </div>

      {/* Output */}
      <div className='mt-4 text-sm text-gray-700'>
        {rangeStartDate && <div>开始: {formatDate(rangeStartDate)}</div>}
        {rangeEndDate && <div>结束: {formatDate(rangeEndDate)}</div>}
      </div>
    </div>
  )
}

export default Calendar
