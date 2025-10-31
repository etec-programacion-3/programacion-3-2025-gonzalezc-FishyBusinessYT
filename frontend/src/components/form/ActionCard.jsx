const damageTypes = [
  { value: 0, label: 'None' },
  { value: 1, label: 'Physical' },
  { value: 2, label: 'Energy' },
  { value: 3, label: 'Heat' },
  { value: 4, label: 'Chill' },
  { value: 5, label: 'Psychic' },
];

export default function ActionCard({ action, index, updateAction, removeAction }) {
  return (
    <div className="item-card">
      <div className="item-card-header">
        <h3 className="item-card-title">Action {index + 1}</h3>
        <button
          type="button"
          onClick={() => removeAction(index)}
          className="btn btn-danger"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>

      <div className="form-grid-3">
        <div className="form-group">
          <label className="form-label">Turn Actions</label>
          <input
            type="number"
            value={action.turn_actions}
            onChange={(e) => updateAction(index, 'turn_actions', parseFloat(e.target.value) || 0)}
            min={0}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Stamina</label>
          <input
            type="number"
            value={action.stamina}
            onChange={(e) => updateAction(index, 'stamina', parseFloat(e.target.value) || 0)}
            min={0}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Range</label>
          <input
            type="number"
            value={action.range}
            onChange={(e) => updateAction(index, 'range', parseFloat(e.target.value) || 0)}
            min={0}
            className="form-input"
          />
        </div>
      </div>

      <div className="item-card-section">
        <h4 className="item-card-section-title">Damage</h4>
        <div className="form-grid-5">
          <div className="form-group">
            <label className="form-label">Dice</label>
            <input
              type="number"
              value={action.damage.dice}
              onChange={(e) => updateAction(index, 'damage.dice', parseFloat(e.target.value) || 1)}
              min={1}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Faces</label>
            <input
              type="number"
              value={action.damage.faces}
              onChange={(e) => updateAction(index, 'damage.faces', parseFloat(e.target.value) || 1)}
              min={1}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Modifier</label>
            <input
              type="number"
              value={action.damage.modifier}
              onChange={(e) => updateAction(index, 'damage.modifier', parseFloat(e.target.value) || 0)}
              min={0}
              max={18}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select
              value={action.damage.type}
              onChange={(e) => updateAction(index, 'damage.type', parseInt(e.target.value))}
              className="form-select"
            >
              {damageTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <input
              type="text"
              value={action.damage.notes}
              onChange={(e) => updateAction(index, 'damage.notes', e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
