export const isHTMLElement = (element: unknown): element is HTMLElement => {
  return element instanceof HTMLElement
}

export const getScrollContainer = (element: HTMLElement, isVertical = true): HTMLElement | Window => {
  let parent: HTMLElement | null = element

  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break
    }

    if (!parent.parentNode) {
      return window
    }

    const overflow = window.getComputedStyle(parent)[
      isVertical ? 'overflowY' : 'overflowX'
    ]
    
    if (overflow === 'scroll' || overflow === 'auto') {
      return parent
    }

    parent = parent.parentElement
  }

  return window
}

export const isInViewport = (element: HTMLElement, container: HTMLElement | Window): boolean => {
  if (!element || !container) return false

  const elementRect = element.getBoundingClientRect()
  
  if (container === window) {
    return (
      elementRect.top < window.innerHeight &&
      elementRect.bottom > 0 &&
      elementRect.left < window.innerWidth &&
      elementRect.right > 0
    )
  }

  if (!isHTMLElement(container)) return false

  const containerRect = container.getBoundingClientRect()
  return (
    elementRect.top < containerRect.bottom &&
    elementRect.bottom > containerRect.top &&
    elementRect.left < containerRect.right &&
    elementRect.right > containerRect.left
  )
}