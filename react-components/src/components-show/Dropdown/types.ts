export interface DropdownItem {
  label: string
  children?: DropdownItem[]
}

export interface DropdownItemProps {
  item: DropdownItem
  onDropdownItemSelect: (items: DropdownItem) => void
}

export interface DropdownProps {
  items: DropdownItem[]
  onSelect: (items: DropdownItem) => void
}
