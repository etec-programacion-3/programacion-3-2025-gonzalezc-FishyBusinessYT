import { useState, useEffect } from 'react';
import { api } from '../services/api';
import '../styles/CreatureDetail.css';

const damageTypeLabels = {
  0: 'None',
  1: 'Physical',
  2: 'Energy',
  3: 'Heat',
  4: 'Chill',
  5: 'Psychic'
};

const lootTypeLabels = {
  1: 'Material',
  2: 'Power',
  3: 'Component'
};

export default function CreatureDetail({ creatureId, onEdit }) {
  const [creature, setCreature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCreature();
  }, [creatureId]);

  const fetchCreature = async () => {
    try {
      setLoading(true);
      const data = await api.getCreature(creatureId);
      setCreature(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    onEdit(creatureId);
  };

  if (loading) {
    return <div className="loading">Loading creature details...</div>;
  }

  if (error) {
    return (
      <div className="detail-container">
        <div className="error">Error: {error}</div>
        <button onClick={onBack} className="btn btn-secondary">
          ← Back to Grid
        </button>
      </div>
    );
  }

  // Convert stats array to object for easier access
  const statsObj = creature.stats.reduce((acc, stat) => {
    acc[stat.name] = stat.value;
    return acc;
  }, {});

  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="detail-header">
          <div className="detail-header-content">
            <h1 className="detail-title">{creature.name}</h1>
            <button
              onClick={handleEdit}
              className="btn btn-edit"
              title="Edit creature"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
          </div>
        </div>

        <div className="detail-section">
          <h2 className="detail-section-title">Description</h2>
          <p className="detail-description">{creature.description}</p>
        </div>

        <div className="detail-section">
          <h2 className="detail-section-title">Stats</h2>
          <div className="stats-display-grid">
            {Object.entries(statsObj).map(([name, value]) => (
              <div key={name} className="stat-display-item">
                <span className="stat-display-label">{name.toUpperCase()}</span>
                <span className="stat-display-value">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {creature.passives && creature.passives.length > 0 && (
          <div className="detail-section">
            <h2 className="detail-section-title">Passive Abilities</h2>
            <div className="passives-list">
              {creature.passives.map((passive) => (
                <div key={passive.id} className="passive-item">
                  <span className="passive-name">{passive.name}</span>
                  {passive.description && (
                    <span className="passive-description">{passive.description}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {creature.actions && creature.actions.length > 0 && (
          <div className="detail-section">
            <h2 className="detail-section-title">Actions</h2>
            <div className="actions-grid">
              {creature.actions.map((action) => (
                <div key={action.id} className="action-card">
                  <div className="action-stats">
                    <div className="action-stat">
                      <span className="action-stat-label">Turn Actions</span>
                      <span className="action-stat-value">{action.turn_actions}</span>
                    </div>
                    <div className="action-stat">
                      <span className="action-stat-label">Stamina</span>
                      <span className="action-stat-value">{action.stamina}</span>
                    </div>
                    <div className="action-stat">
                      <span className="action-stat-label">Range</span>
                      <span className="action-stat-value">{action.range}</span>
                    </div>
                  </div>
                  <div className="action-damage">
                    <h4 className="action-damage-title">Damage</h4>
                    <div className="action-damage-details">
                      <span className="damage-dice">{action.damage_dice}d{action.damage_dice_faces}</span>
                      {action.damage_modifier > 0 && (
                        <span className="damage-modifier">+{action.damage_modifier}</span>
                      )}
                      <span className="damage-type">{damageTypeLabels[action.damage_type]}</span>
                    </div>
                    {action.notes && (
                      <p className="action-notes">{action.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {creature.harvestables && creature.harvestables.length > 0 && (
          <div className="detail-section">
            <h2 className="detail-section-title">Loot</h2>
            <div className="loot-grid">
              {creature.harvestables.map((loot) => (
                <div key={loot.id} className="loot-card">
                  <div className="loot-yield">
                    <span className="loot-yield-label">Yield</span>
                    <span className="loot-yield-value">{loot.yield_dice}d{loot.yield_dice_faces}</span>
                  </div>
                  <div className="loot-type">
                    <span className="loot-type-label">Type</span>
                    <span className="loot-type-value">{lootTypeLabels[loot.type]}</span>
                  </div>
                  {loot.requires_test && (
                    <div className="loot-test-badge">Requires Test</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
