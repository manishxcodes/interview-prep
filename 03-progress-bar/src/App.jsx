import { useEffect, useState } from "react"
import { ProgressBar } from "./components/progress-bar"

function App() {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
  }

  useEffect(() => {
    const interval =  setInterval(() => {
      setValue( prev => {
        if(prev > 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1
      }
      );
    }, 100);

    return () => clearInterval(interval);
  }, [])


  return (
    <div className='app'>
      <div>Progress Bar</div>
        <div>
          <ProgressBar  value={value} onComplete={handleSuccess}/>
          <span>{success ? "Complete" : "Loading"}</span>
        </div>
    </div>
  )
}

export default App
