import './VerbSelector.css'

function VerbSelector({ verbs, tense, onSelect }) {
  const groups = [
    { id: '-ar', label: '-AR Verbs' },
    { id: '-er', label: '-ER Verbs' },
    { id: '-ir', label: '-IR Verbs' },
    { id: 'irregular', label: 'Irregular Verbs' },
  ]

  return (
    <div className="verb-selector">
      {groups.map(group => {
        const groupVerbs = verbs.filter(v => v.group === group.id)
        if (groupVerbs.length === 0) return null

        return (
          <div key={group.id} className="verb-group">
            <h3 className="verb-group-title">{group.label}</h3>
            <div className="verb-grid">
              {groupVerbs.map(verb => (
                <button
                  key={verb.infinitive}
                  className="verb-card"
                  onClick={() => onSelect(verb)}
                >
                  <span className="verb-infinitive">{verb.infinitive}</span>
                  <span className="verb-english">{verb.english}</span>
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default VerbSelector
