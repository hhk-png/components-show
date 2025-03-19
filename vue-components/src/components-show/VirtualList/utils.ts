export const throttle = (fn: Function, delay: number) => {
  let timer: number | null
  return (...args: any[]) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args)
        timer = null
      }, delay)
    }
  }
}
