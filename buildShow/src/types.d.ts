export type FileType = 'file' | 'dir'

export interface CompFile {
  type: FileType
  content: string
  name: string
  path: string
  ext: string
}

export interface CompDir {
  type: FileType
  name: string
  path: string
  children: FileTree
}

export type FileItem = CompFile | CompDir
export type FileTree = FileItem[]
