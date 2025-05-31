import ContinuousProgress from './Continuous'
import { DisContinuous } from './DisContinuous'

const Show = () => {
  return (
    <div>
      <b className='block mb-3'>ContinuousProgress:</b>
      <div className='w-[300px]'>
        <ContinuousProgress bgcolor={'#6a1b9a'} ratio={70}></ContinuousProgress>
      </div>
      <b className='block mb-8'>DisContinuousProgress:</b>
      <div className='w-[300px] flex justify-center'>
        <DisContinuous step={12} currentStep={7}></DisContinuous>
      </div>
    </div>
  )
}

export default Show
