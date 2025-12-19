import { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import './App.css'

function App() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    WebApp.expand()
  }, [])

  // 1. Intro Screen
  if (step === 0) {
    return (
      <div className="container">
        <h1>Shadow Test</h1>
        <button onClick={() => setStep(1)}>Start</button>
      </div>
    )
  }

  // 2. Question Screen (Simplified)
  if (step === 1) {
    return (
      <div className="container">
        <h2>Question 1</h2>
        <p>Do you manipulate?</p>
        <button onClick={() => setStep(2)}>Yes</button>
        <button onClick={() => setStep(2)}>No</button>
      </div>
    )
  }

  // 3. Ad Gate
  if (step === 2) {
    return (
      <div className="container">
        <h2>Locked</h2>
        <button onClick={() => setStep(3)}>Watch Ad</button>
      </div>
    )
  }

  // 4. Result Screen (With Share Button)
  return (
    <div className="container">
      <h1>You are a Strategist</h1>
      <button 
        onClick={() => WebApp.switchInlineQuery("I am a Strategist", ['users'])}
        style={{ backgroundColor: '#0088cc', margin: '10px 0' }}
      >
        Share Result
      </button>
      <button onClick={() => setStep(0)}>Retake</button>
    </div>
  )
}

export default App
