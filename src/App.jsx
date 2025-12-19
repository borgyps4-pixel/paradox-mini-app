import { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import './App.css'

// --- CONTENT DATA ---
const questions = [
  {
    id: 1,
    text: "When you want something from someone, you usually:",
    options: [
      { text: "Ask them directly", type: "A" },
      { text: "Make them think it was their idea", type: "B" },
      { text: "Wait for them to offer it", type: "C" }
    ]
  },
  {
    id: 2,
    text: "You discover a secret about a rival. You:",
    options: [
      { text: "Tell everyone immediately", type: "A" },
      { text: "Keep it for leverage later", type: "B" },
      { text: "Ignore it completely", type: "C" }
    ]
  },
  {
    id: 3,
    text: "In a group project, you prefer to be:",
    options: [
      { text: "The loud leader", type: "A" },
      { text: "The one pulling strings in the background", type: "B" },
      { text: "The quiet observer", type: "C" }
    ]
  }
];

const results = {
  A: { title: "The Direct Force", desc: "You are blunt and aggressive. You lack subtlety." },
  B: { title: "The Shadow Strategist", desc: "You are a master of manipulation. You control outcomes without being seen." },
  C: { title: "The Silent Observer", desc: "You see everything but say nothing. Your power is knowledge." }
};

function App() {
  const [userData, setUserData] = useState(null)
  
  // Quiz State
  const [step, setStep] = useState(0); // 0 = Intro, 1-3 = Questions, 4 = Ad Gate, 5 = Result
  const [scores, setScores] = useState({ A: 0, B: 0, C: 0 });
  const [finalResult, setFinalResult] = useState(null);
  const [isAdLoading, setIsAdLoading] = useState(false);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user)
    }
    WebApp.expand(); // Make sure app is full height
  }, [])

  const handleAnswer = (type) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);
    
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      // Quiz finished, determine winner
      const winner = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
      setFinalResult(results[winner]);
      setStep(4); // Go to Ad Gate
    }
  };

  const showRewardAd = () => {
    setIsAdLoading(true);
    // Replace 123456 with your REAL zone ID function
    if (typeof window.show_10349192 === 'function') {
      window.show_10349192()
        .then(() => {
          setStep(5); // Show Result
        })
        .catch(() => WebApp.showAlert("Ad failed. Try again."))
        .finally(() => setIsAdLoading(false));
    } else {
      // Simulator for dev
      setTimeout(() => {
          setStep(5);
          setIsAdLoading(false);
      }, 1000);
    }
  };

  // --- RENDER HELPERS ---
  
  if (step === 0) {
    return (
      <div className="container">
        <h1>Shadow Self Test</h1>
        <p>Discover your hidden psychological archetype.</p>
        <button onClick={() => setStep(1)}>Start Analysis</button>
      </div>
    );
  }

  if (step >= 1 && step <= questions.length) {
    const q = questions[step - 1];
    return (
      <div className="container">
        <h2>Question {step}/{questions.length}</h2>
        <p className="question-text">{q.text}</p>
        <div className="options-grid">
          {q.options.map((opt, i) => (
            <button key={i} className="option-btn" onClick={() => handleAnswer(opt.type)}>
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="container">
        <h2>Analysis Complete</h2>
        <p>Your Shadow Archetype has been identified.</p>
        <div className="blurred-box">
           <h3>???</h3>
           <p>Hidden Content</p>
        </div>
        <button className="unlock-btn" onClick={showRewardAd} disabled={isAdLoading}>
          {isAdLoading ? 'Processing...' : 'Watch Ad to Reveal'}
        </button>
      </div>
    );
  }

    if (step === 5) {
    return (
      <div className="container">
        <h1>{finalResult.title}</h1>
        <p className="result-desc">{finalResult.desc}</p>
        
        {/* NEW SHARE BUTTON START */}
        <button 
          onClick={() => {
            const message = `I am ${finalResult.title}. Find out your Shadow Trait here:`;
            WebApp.switchInlineQuery(message, ['users']);
          }}
          style={{ 
            backgroundColor: '#0088cc', /* Telegram Blue */
            marginBottom: '15px' 
          }}
        >
          Share Result 🚀
        </button>
        {/* NEW SHARE BUTTON END */}

        <button onClick={() => window.location.reload()}>Retake Test</button>
      </div>
    );
  }


    return (
      <div className="container">
        <h1>{finalResult.title}</h1>
        <p className="result-desc">{finalResult.desc}</p>
        <button onClick={() => window.location.reload()}>Retake Test</button>
      </div>
    );
  }
}

export default App
