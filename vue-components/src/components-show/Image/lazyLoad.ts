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

export const isInViewport = (target: HTMLElement, container: Window | HTMLElement) => {
  if (!target || !container) return false

  const elClientReact = target.getBoundingClientRect()
  let containerClientRect: any = null

  if (container !== window) {
    containerClientRect = (container as HTMLElement).getBoundingClientRect()
  } else {
    containerClientRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    }
  }

  return (
    elClientReact.top < containerClientRect.bottom &&
    elClientReact.bottom > containerClientRect.top &&
    elClientReact.right > containerClientRect.left &&
    elClientReact.left < containerClientRect.right
  )
}
