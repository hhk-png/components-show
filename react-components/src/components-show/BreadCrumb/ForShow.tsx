import React from "react"
import Breadcrumb from "./BreadCrumb"

const Show: React.FC = () => {

  const pathNames = ["products", "clothes"]
  const activePath = "products"

  const onClickElement = (path: string) => {
    console.log(path)
  }

  return (
    <div>
      <Breadcrumb
        homeElement={'home'}
        pathNames={pathNames}
        activePath={activePath}
        onClickElement={onClickElement}
      />
    </div>
  )
}

export default Show
