import Scrollbar from './Scrollbar'

function App() {
  return (
    <div>
      <h2 className='text-lg font-semibold mb-2'>双向滚动</h2>
      <Scrollbar
        className='border border-gray-300 rounded-lg'
        height='300px'
        width='500px'
      >
        <div className='p-4' style={{ width: '800px' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className='flex gap-2 py-2'>
              <span>行 {i + 1}</span>
              {Array.from({ length: 15 }).map((_, j) => (
                <div
                  key={j}
                  className='w-16 h-10 bg-green-100 rounded flex items-center justify-center'
                >
                  {i + 1}-{j + 1}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  )
}

export default App
