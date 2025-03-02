import { useEffect, useState } from 'react'
import LeftMenu from './components/LeftMenu'
import RightDisplay from './components/RightDisplay'

function App() {

  const [componentsList, setComponentsList] = useState<string[]>([])
  useEffect(() => {
    async function fetchList() {
      const list = await fetch(import.meta.env.VITE_API_BASE_URL + '/componentsList.json').then(res => res.json())
      setComponentsList(list)
      setSelectedComponent(list[0])
    }
    fetchList()
  }, [])

  const [selectedComponent, setSelectedComponent] = useState(componentsList[0])
  if (selectedComponent === '') {
    throw new Error('Please select a component')
  }
  
  const handleSelectComponent = (component: string) => {
    setSelectedComponent(component)
  }

  return (
    <div className="flex">
      <LeftMenu
        className="basis-60 overflow-y-auto h-[100vh]"
        components={componentsList}
        onSelectComponent={handleSelectComponent}
      ></LeftMenu>
      <div className="h-[100vh] grow overflow-y-auto">
        <RightDisplay
          className=""
          selectedComponent={selectedComponent}
        ></RightDisplay>
      </div>
    </div>
  )
}

export default App
