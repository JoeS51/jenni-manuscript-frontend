import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input id="picture" type="file" />
      </div>
    </>
  )
}

export default App
