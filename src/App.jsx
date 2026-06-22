import { useState } from 'react'
import Header from './components/Header'
import PillarSelector from './components/PillarSelector'
import ConjugationTable from './components/ConjugationTable'
import PracticeMode from './components/PracticeMode'
import VerbSelector from './components/VerbSelector'
import { tenses, verbs } from './data/verbs'
import './App.css'

function App() {
  const [selectedTense, setSelectedTense] = useState(null)
  const [selectedVerb, setSelectedVerb] = useState(null)
  const [mode, setMode] = useState('learn')

  const currentTense = tenses.find(t => t.id === selectedTense)

  const handleBack = () => {
    if (selectedVerb) {
      setSelectedVerb(null)
    } else if (selectedTense) {
      setSelectedTense(null)
      setMode('learn')
    }
  }

  return (
    <div className="app">
      <Header />

      {!selectedTense && (
        <PillarSelector tenses={tenses} onSelect={setSelectedTense} />
      )}

      {selectedTense && !selectedVerb && (
        <>
          <button className="back-button" onClick={handleBack}>
            ← Back to Pillars
          </button>
          <div className="tense-header">
            <span className="tense-icon">{currentTense.icon}</span>
            <h2>{currentTense.name}</h2>
            <p className="tense-desc">{currentTense.description}</p>
            <p className="tense-example">
              <em>{currentTense.example}</em>
            </p>
          </div>

          <div className="mode-toggle">
            <button
              className={`mode-btn ${mode === 'learn' ? 'active' : ''}`}
              onClick={() => setMode('learn')}
            >
              📚 Learn
            </button>
            <button
              className={`mode-btn ${mode === 'practice' ? 'active' : ''}`}
              onClick={() => setMode('practice')}
            >
              ✏️ Practice
            </button>
          </div>

          {mode === 'learn' && (
            <VerbSelector
              verbs={verbs}
              tense={selectedTense}
              onSelect={setSelectedVerb}
            />
          )}

          {mode === 'practice' && (
            <PracticeMode tense={selectedTense} verbs={verbs} />
          )}
        </>
      )}

      {selectedVerb && (
        <>
          <button className="back-button" onClick={handleBack}>
            ← Back to Verbs
          </button>
          <ConjugationTable verb={selectedVerb} tense={selectedTense} />
        </>
      )}
    </div>
  )
}

export default App
