
export interface BreadCrumbProps {
  pathNames: string[]
  activePath?: string
}
export interface BreadCrumbEmits {
  (e: 'clickElement', path: string): void
}

export const HOME = '首页'
