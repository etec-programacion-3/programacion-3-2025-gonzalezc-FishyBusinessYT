import LootCard from '../form/LootCard';

export default function LootSection({ loot, setFormData }) {
  const addLoot = () => {
    setFormData(prev => ({
      ...prev,
      loot: [...prev.loot, {
        dice: 1,
        faces: 6,
        requires_test: false,
        type: 1
      }]
    }));
  };

  const updateLoot = (index, field, value) => {
    setFormData(prev => {
      const newLoot = [...prev.loot];
      newLoot[index][field] = value;
      return { ...prev, loot: newLoot };
    });
  };

  const removeLoot = (index) => {
    setFormData(prev => ({
      ...prev,
      loot: prev.loot.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="section-title">Loot</h2>
        <button
          type="button"
          onClick={addLoot}
          className="btn btn-secondary btn-small"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Loot
        </button>
      </div>

      {loot.map((item, idx) => (
        <LootCard
          key={idx}
          loot={item}
          index={idx}
          updateLoot={updateLoot}
          removeLoot={removeLoot}
        />
      ))}
    </div>
  );
}
