import React from 'react'

export interface IconProps {
  src: string
  className?: string
  alt?: string
}

const Icon: React.FC<IconProps> = ({ src, className = '', alt }) => {
  return (
    <img
      className={`inline-block ${className}`}
      src={import.meta.env.VITE_API_BASE_URL + src}
      alt={alt}
    />
  )
}

export default Icon
