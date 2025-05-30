import VirtualTable from './VirtualTable'

const App = () => {
  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>虚拟表格组件示例</h1>
      <VirtualTable
        rowCount={1000}
        colCount={1000}
        rowHeight={30}
        colWidths={Array.from({ length: 1000 }, () => 100)}
        width={500}
        height={400}
        headers={Array.from({ length: 1000 }, (_, i) => `标题 ${i}`)}
        cellRenderer={(row, col) => `(${row},${col})`}
      />
    </div>
  )
}

export default App
