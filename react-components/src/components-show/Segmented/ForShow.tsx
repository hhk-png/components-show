import { useState } from 'react'
import SegmentedControl from './Segmented'

const ForShow = () => {
  const [selectedValue1, setSelectedValue1] = useState('complete')

  return (
    <div>
      <SegmentedControl
        name='group-1'
        onSelect={(val) => setSelectedValue1(val)}
        defaultIndex={0}
        segments={[
          {
            label: 'Complete',
            value: 'complete',
          },
          {
            label: 'Incomplete',
            value: 'incomplete',
          },
          {
            label: 'Pending',
            value: 'pending',
          },
        ]}
      />
      <p className='text-center m-2'>Selected: {selectedValue1}</p>
    </div>
  )
}

export default ForShow
