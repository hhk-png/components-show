import { useState } from 'react'
import Rate from './Rate'

export default function App() {
  const [curScore, setCurScore] = useState<number>(3)

  return (
    <div className="p-6 space-y-4">
      <h3 className="font-semibold text-lg">显示数字：</h3>
      <Rate score={curScore} onScoreChange={setCurScore} disabled={false} />

      <h3 className="font-semibold text-lg">只读，显示数字：</h3>
      <Rate score={3} disabled={true} showText />
    </div>
  )
}
