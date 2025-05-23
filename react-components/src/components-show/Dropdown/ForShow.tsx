import Dropdown from './Dropdown'
import type { DropdownItem } from './types'

const menuItems: DropdownItem[] = [
  { label: '文件' },
  {
    label: '编辑',
    children: [
      {
        label: '复制',
        children: [
          { label: '深拷贝' },
          {
            label: '浅拷贝',
            children: [{ label: '第一种方式' }, { label: '第二种方式' }],
          },
        ],
      },
    ],
  },
  { label: '视图' },
  { label: '帮助' },
]

const Show: React.FC = () => {
  const handleSelect = (item: DropdownItem) => {
    console.log(item)
  }

  return (
    <div className='p-6'>
      <Dropdown items={menuItems} onSelect={handleSelect} />
    </div>
  )
}

export default Show
