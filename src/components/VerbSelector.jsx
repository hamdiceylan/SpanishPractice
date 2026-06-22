import { useState } from 'react'
import { categories } from '../data/verbs'
import './VerbSelector.css'

function VerbSelector({ verbs, tense, onSelect }) {
  const [groupBy, setGroupBy] = useState('category')
  const [expandedGroups, setExpandedGroups] = useState(new Set(categories.map(c => c.id)))

  const toggleGroup = (id) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const grammarGroups = [
    { id: '-ar', label: '-AR Verbs' },
    { id: '-er', label: '-ER Verbs' },
    { id: '-ir', label: '-IR Verbs' },
    { id: 'irregular', label: 'Irregular Verbs' },
  ]

  const groups = groupBy === 'category'
    ? categories.map(cat => ({
        id: cat.id,
        label: `${cat.icon} ${cat.name}`,
        description: cat.description,
        verbs: verbs.filter(v => v.category === cat.id),
      }))
    : grammarGroups.map(g => ({
        id: g.id,
        label: g.label,
        description: null,
        verbs: verbs.filter(v => v.group === g.id),
      }))

  return (
    <div className="verb-selector">
      <div className="group-by-toggle">
        <span className="group-by-label">Group by:</span>
        <button
          className={`group-toggle-btn ${groupBy === 'category' ? 'active' : ''}`}
          onClick={() => setGroupBy('category')}
        >
          Category
        </button>
        <button
          className={`group-toggle-btn ${groupBy === 'grammar' ? 'active' : ''}`}
          onClick={() => setGroupBy('grammar')}
        >
          Grammar (-ar/-er/-ir)
        </button>
      </div>

      <p className="verb-count">{verbs.length} verbs total</p>

      {groups.map(group => {
        if (group.verbs.length === 0) return null
        const isExpanded = expandedGroups.has(group.id)

        return (
          <div key={group.id} className="verb-group">
            <button
              className="verb-group-header"
              onClick={() => toggleGroup(group.id)}
            >
              <div className="verb-group-title-row">
                <h3 className="verb-group-title">{group.label}</h3>
                <span className="verb-group-count">{group.verbs.length}</span>
                <span className={`verb-group-chevron ${isExpanded ? 'expanded' : ''}`}>›</span>
              </div>
              {group.description && (
                <p className="verb-group-desc">{group.description}</p>
              )}
            </button>

            {isExpanded && (
              <div className="verb-grid">
                {group.verbs.map(verb => (
                  <button
                    key={verb.infinitive}
                    className="verb-card"
                    onClick={() => onSelect(verb)}
                  >
                    <span className="verb-infinitive">{verb.infinitive}</span>
                    <span className="verb-english">{verb.english}</span>
                    {groupBy === 'category' && (
                      <span className="verb-type-badge">{verb.group}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default VerbSelector
