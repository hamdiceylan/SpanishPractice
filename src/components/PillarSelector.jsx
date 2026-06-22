import './PillarSelector.css'

function PillarSelector({ tenses, onSelect }) {
  return (
    <div className="pillars">
      <div className="pillar-connector" />
      {tenses.map((tense, index) => (
        <button
          key={tense.id}
          className="pillar-card"
          onClick={() => onSelect(tense.id)}
          style={{ '--pillar-color': tense.color }}
        >
          <div className="pillar-dot" />
          <div className="pillar-content">
            <div className="pillar-icon">{tense.icon}</div>
            <div className="pillar-text">
              <h3>
                <span className="pillar-number">{index + 1}.</span> {tense.name}
              </h3>
              <p>{tense.description}</p>
            </div>
            <div className="pillar-example">
              <span className="example-label">Example</span>
              <span className="example-text">{tense.example}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default PillarSelector
