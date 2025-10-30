import { useState } from 'react';

export default function PassivesSection({ passives, setFormData }) {
  const [newPassive, setNewPassive] = useState('');

  const addPassive = () => {
    if (newPassive.trim() && newPassive.length <= 50) {
      setFormData(prev => ({
        ...prev,
        passives: [...prev.passives, newPassive.trim()]
      }));
      setNewPassive('');
    }
  };

  const removePassive = (index) => {
    setFormData(prev => ({
      ...prev,
      passives: prev.passives.filter((_, i) => i !== index)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPassive();
    }
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Passive Abilities</h2>

      <div className="passive-input-group">
        <input
          type="text"
          value={newPassive}
          onChange={(e) => setNewPassive(e.target.value)}
          onKeyPress={handleKeyPress}
          maxLength={50}
          placeholder="Enter passive ability..."
          className="form-input"
        />
        <button
          type="button"
          onClick={addPassive}
          className="btn btn-secondary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add
        </button>
      </div>

      <div>
        {passives.map((passive, idx) => (
          <div key={idx} className="list-item">
            <span className="list-item-text">{passive}</span>
            <button
              type="button"
              onClick={() => removePassive(idx)}
              className="btn btn-danger"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
