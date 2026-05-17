import './QuickChips.css'

export default function QuickChips({ chips, onSelect, disabled }) {
  return (
    <div className="quick-chips">
      {chips.map(chip => (
        <button
          key={chip}
          className="chip"
          onClick={() => onSelect(chip)}
          disabled={disabled}
        >
          {chip}
        </button>
      ))}
    </div>
  )
}
