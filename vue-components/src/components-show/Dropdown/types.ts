
export interface DropdownItem {
  label: string
  children?: DropdownItem[]
}

export interface DropdownItemProps {
  item: DropdownItem
}

export interface DropdownItemEmits {
  (e: 'dropdown-item-select', items: DropdownItem): void
}

export interface DropdownProps {
  items: DropdownItem[]
}

export interface DropdownEmits {
  (e: 'select', items: DropdownItem): void
}
