import { useState, useCallback, useRef, useEffect } from 'react'
import { pronouns } from '../data/verbs'
import './PracticeMode.css'

function PracticeMode({ tense, verbs }) {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const inputRef = useRef(null)

  const generateQuestion = useCallback(() => {
    const verb = verbs[Math.floor(Math.random() * verbs.length)]
    const pronounIndex = Math.floor(Math.random() * pronouns.length)
    setCurrentQuestion({
      verb,
      pronounIndex,
      pronoun: pronouns[pronounIndex],
      answer: verb[tense][pronounIndex],
    })
    setUserAnswer('')
    setFeedback(null)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [verbs, tense])

  useEffect(() => {
    generateQuestion()
  }, [generateQuestion])

  const normalize = (str) => str.trim().toLowerCase()

  const stripAccents = (str) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentQuestion || feedback) return

    const userNorm = normalize(userAnswer)
    const answerNorm = normalize(currentQuestion.answer)
    const isExact = userNorm === answerNorm
    const isAlmostCorrect = !isExact && stripAccents(userNorm) === stripAccents(answerNorm)

    setFeedback({
      correct: isExact,
      almostCorrect: isAlmostCorrect,
      correctAnswer: currentQuestion.answer,
    })
    setScore(prev => ({
      correct: prev.correct + (isExact || isAlmostCorrect ? 1 : 0),
      total: prev.total + 1,
    }))
  }

  const handleNext = () => {
    generateQuestion()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && feedback) {
      e.preventDefault()
      handleNext()
    }
  }

  if (!currentQuestion) return null

  const percentage = score.total > 0
    ? Math.round((score.correct / score.total) * 100)
    : 0

  return (
    <div className="practice">
      <div className="practice-score">
        <span className="score-correct">{score.correct}</span>
        <span className="score-divider">/</span>
        <span className="score-total">{score.total}</span>
        {score.total > 0 && (
          <span className="score-percentage">({percentage}%)</span>
        )}
      </div>

      <div className="practice-card">
        <div className="practice-prompt">
          <span className="practice-verb">
            {currentQuestion.verb.infinitive}
          </span>
          <span className="practice-english">
            ({currentQuestion.verb.english})
          </span>
        </div>

        <div className="practice-pronoun">
          {currentQuestion.pronoun}
        </div>

        <form onSubmit={handleSubmit} className="practice-form">
          <input
            ref={inputRef}
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type the conjugation..."
            className={`practice-input ${
              feedback
                ? feedback.correct
                  ? 'correct'
                  : feedback.almostCorrect
                    ? 'almost'
                    : 'incorrect'
                : ''
            }`}
            disabled={!!feedback}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />

          {!feedback && (
            <button type="submit" className="practice-submit">
              Check
            </button>
          )}
        </form>

        {feedback && (
          <div className={`practice-feedback ${feedback.correct ? 'correct' : feedback.almostCorrect ? 'almost' : 'incorrect'}`}>
            {feedback.correct ? (
              <p>✓ Correct!</p>
            ) : feedback.almostCorrect ? (
              <p>
                Almost! Watch the accent: <strong>{feedback.correctAnswer}</strong>
              </p>
            ) : (
              <p>
                ✗ The answer is: <strong>{feedback.correctAnswer}</strong>
              </p>
            )}
            <button onClick={handleNext} className="practice-next">
              Next →
            </button>
          </div>
        )}
      </div>

      <p className="practice-hint">
        Tip: Use accent marks for correct answers (á, é, í, ó, ú)
      </p>
    </div>
  )
}

export default PracticeMode
