import React from 'react'

interface StarIconProps {
  color?: 'yellow'
}

const StarIcon: React.FC<StarIconProps> = ({ color }) => {
  const colorClass = color === 'yellow' ? 'text-yellow-400' : 'text-gray-300'

  return (
    <svg
      viewBox='0 0 24 24'
      className={`w-full h-full fill-current ${colorClass}`}
    >
      <path d='M12 .587l3.668 7.431L24 9.753l-6 5.847 1.417 8.26L12 18.896 4.583 23.86 6 15.6 0 9.753l8.332-1.735z' />
    </svg>
  )
}

export default StarIcon
