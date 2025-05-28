
export interface TimelineItem {
  text: string
  date: string
  category: {
    tag: string
    color: string
  },
  link: {
    url: string
    text: string
  }
}
