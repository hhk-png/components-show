import { useState } from 'react'
import Transfer from './Transfer'

function Show() {
  const [left, setLeft] = useState([1, 2, 3, 4, 5])
  const [right, setRight] = useState([6, 7, 8, 9, 10])
  return (
    <Transfer
      left={left}
      right={right}
      onChange={(left, right) => {
        setLeft(left)
        setRight(right)
      }}
      initialChecked={[2, 8]}
    ></Transfer>
  )
}

export default Show
