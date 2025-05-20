import { Popover } from './components-show/Popover'

function App() {
  return (
    <div className='mx-auto w-64 mt-20'>
      <Popover content={<div>This is the popover content!</div>}>Click</Popover>
    </div>
  )
}

export default App
