const lootTypes = [
  { value: 1, label: 'Material' },
  { value: 2, label: 'Power' },
  { value: 3, label: 'Component' }
];

export default function LootCard({ loot, index, updateLoot, removeLoot }) {
  return (
    <div className="item-card">
      <div className="item-card-header">
        <h3 className="item-card-title">Loot {index + 1}</h3>
        <button
          type="button"
          onClick={() => removeLoot(index)}
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
          <label className="form-label">Dice</label>
          <input
            type="number"
            value={loot.dice}
            onChange={(e) => updateLoot(index, 'dice', parseFloat(e.target.value) || 1)}
            min={1}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Faces</label>
          <input
            type="number"
            value={loot.faces}
            onChange={(e) => updateLoot(index, 'faces', parseFloat(e.target.value) || 1)}
            min={1}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <select
            value={loot.type}
            onChange={(e) => updateLoot(index, 'type', parseInt(e.target.value))}
            className="form-select"
          >
            {lootTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={loot.requires_test}
            onChange={(e) => updateLoot(index, 'requires_test', e.target.checked)}
            className="checkbox-input"
          />
          Requires Test
        </label>
      </div>
    </div>
  );
}
