import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Welcome to Vite React Starter!</h1>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>

        <h1>Welcome to {import.meta.env.VITE_APP_NAME}!</h1>
        <p>API URL: {import.meta.env.VITE_API_URL}</p>
      </div>
     
    </>
  )
}

export default App
