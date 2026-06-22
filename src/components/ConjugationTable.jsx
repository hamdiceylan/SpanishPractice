import { pronouns, tenses } from '../data/verbs'
import './ConjugationTable.css'

function ConjugationTable({ verb, tense }) {
  const tenseInfo = tenses.find(t => t.id === tense)
  const conjugations = verb[tense]

  return (
    <div className="conjugation-container">
      <div className="conjugation-header">
        <h2>{verb.infinitive}</h2>
        <p className="conjugation-english">{verb.english}</p>
        <span className="conjugation-group">{verb.group}</span>
      </div>

      <div className="conjugation-tense-label" style={{ '--tense-color': tenseInfo.color }}>
        {tenseInfo.icon} {tenseInfo.name}
      </div>

      <table className="conjugation-table">
        <thead>
          <tr>
            <th>Pronoun</th>
            <th>Conjugation</th>
          </tr>
        </thead>
        <tbody>
          {pronouns.map((pronoun, i) => (
            <tr key={pronoun}>
              <td className="pronoun-cell">{pronoun}</td>
              <td className="conjugation-cell">{conjugations[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show all 3 tenses for comparison */}
      <div className="all-tenses">
        <h3>All Tenses Comparison</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Pronoun</th>
              {tenses.map(t => (
                <th key={t.id} className={t.id === tense ? 'active-tense' : ''}>
                  {t.icon} {t.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pronouns.map((pronoun, i) => (
              <tr key={pronoun}>
                <td className="pronoun-cell">{pronoun}</td>
                {tenses.map(t => (
                  <td
                    key={t.id}
                    className={`conjugation-cell ${t.id === tense ? 'highlighted' : ''}`}
                  >
                    {verb[t.id][i]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ConjugationTable
