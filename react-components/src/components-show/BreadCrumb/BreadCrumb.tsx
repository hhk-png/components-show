import React, { useState } from 'react'
import { BreadCrumbProps } from './types'

const HOME = 'home'

const Breadcrumb = ({
  homeElement,
  pathNames,
  activePath,
  saparator = <span> | </span>,
  onClickElement,
}: BreadCrumbProps) => {
  const [active, setActive] = useState(activePath || HOME)

  const onClickPathNames = (path: string) => {
    onClickElement?.(path)
    setActive(path)
  }

  const getLiClassName = (path: string) => {
    return `mx-2 font-bold cursor-pointer ${
      path === active ? 'text-amber-500' : ''
    }`
  }

  return (
    <div className='inline-block'>
      <ul className='flex py-2 bg-gradient-to-r from-purple-600 to-blue-600'>
        {/* home */}
        <li className={getLiClassName(HOME)}>
          <span onClick={() => onClickPathNames(HOME)}>{homeElement}</span>
        </li>
        {pathNames.length > 0 && saparator}

        {/* path names */}
        {pathNames.map((link, index) => {
          return (
            <React.Fragment key={index}>
              <li className={getLiClassName(link)}>
                <span onClick={() => onClickPathNames(link)}>{link}</span>
              </li>
              {pathNames.length !== index + 1 && saparator}
            </React.Fragment>
          )
        })}
      </ul>
    </div>
  )
}

export default Breadcrumb
