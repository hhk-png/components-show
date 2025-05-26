import React, { useEffect, useRef, useState } from 'react'
import { AffixProps } from './types'

export default function Affix({
  top,
  left = 0,
  children,
  offset = 0,
}: AffixProps) {
  const elementRef = useRef<HTMLDivElement | null>(null)

  const [affixed, setAffixed] = useState(false)
  // placeholder for width to prevent layout shift
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const scrollY = window.scrollY || window.pageYOffset
    const distanceToBody = scrollY + rect.top

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const shouldAffix = window.scrollY > distanceToBody - top - offset
        if (shouldAffix !== affixed) {
          setAffixed(shouldAffix)
          if (shouldAffix) {
            setWidth(el.offsetWidth)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [top, offset, affixed])

  const affixStyle: React.CSSProperties = affixed
    ? {
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        width: width ?? 'auto',
        zIndex: 1,
      }
    : {}

  return (
    <>
      {/** 占位元素防止页面跳动 */}
      {affixed && (
        <div
          style={{
            width: width ?? 'auto',
            height: elementRef.current?.offsetHeight,
          }}
        />
      )}
      <div ref={elementRef} style={affixStyle}>
        {children}
      </div>
    </>
  )
}
