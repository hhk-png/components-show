import Affix from './Affix'

export default function ForShow() {
  return (
    <div className='h-full w-full bg-blue-50 overflow-y-auto'>
      <h1>Affix Component Example</h1>
      <Affix top={100} left={100} offset={0}>
        <div
          style={{
            width: '200px',
            height: '50px',
            backgroundColor: 'lightblue',
          }}
        >
          Affix Element
        </div>
      </Affix>
      <div style={{ height: '1500px', paddingTop: '200px' }}>
        Scroll down to see the affix in action.
      </div>
    </div>
  )
}
