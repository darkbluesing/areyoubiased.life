
export default function QuestionCard({ q, options, selected, onSelect }) {
  return (
    <div>
      <div className="question">{q}</div>
      <div className="options-list">
        {options.map((opt, i) => {
          const sel = selected === i;
          return (
            <button key={i} className={'option-card' + (sel ? ' selected' : '')} onClick={() => onSelect(i)}>
              <div className="option-radio"><div className="option-radio-dot"></div></div>
              <div>{opt}</div>
            </button>
          );
        })}
      </div>
    </div>
  )
}
