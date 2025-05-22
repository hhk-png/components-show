import { Menu, MenuItem, SubMenu } from './Menu'

const MenuForShow = () => {
  return (
    <div className='p-4'>
      <Menu>
        <MenuItem>首页</MenuItem>
        <SubMenu title='用户中心'>
          <MenuItem>个人资料</MenuItem>
          <MenuItem>账户设置</MenuItem>
          <SubMenu title='用户中心'>
            <MenuItem>个人资料</MenuItem>
            <MenuItem>账户设置</MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu title='设置'>
          <MenuItem>系统设置</MenuItem>
          <MenuItem>安全设置</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default MenuForShow
