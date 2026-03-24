import { useState } from 'react'
import './App.css'

function App() {
  const [liked, setLiked] = useState(false);

  return (
    <div>
      <Button>Like</Button>
    </div>
  )
}

export default App
