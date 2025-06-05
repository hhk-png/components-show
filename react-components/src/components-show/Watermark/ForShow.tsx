import Watermark from './Watermark'

export default function Show() {
  return (
    <Watermark
      className='w-full h-[300px]'
      markSize={[150, 100]}
      text='Confidential'
    >
      <h1 className='text-4xl font-bold'>Hello World</h1>
      <p>This is a page with a watermark.</p>
    </Watermark>
  )
}
