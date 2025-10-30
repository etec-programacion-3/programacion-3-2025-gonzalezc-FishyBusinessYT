export default function StatsSection({ stats, setFormData }) {
  const handleStatChange = (stat, value) => {
    setFormData(prev => ({
      ...prev,
      stats: { ...prev.stats, [stat]: parseFloat(value) || 0 }
    }));
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Stats</h2>

      <div className="stats-grid">
        {Object.keys(stats).map(stat => (
          <div key={stat} className="form-group">
            <label className="form-label">{stat.toUpperCase()}</label>
            <input
              type="number"
              value={stats[stat]}
              onChange={(e) => handleStatChange(stat, e.target.value)}
              min={['chilld', 'energyd', 'heatd', 'physicald', 'psychicd'].includes(stat) ? undefined : 1}
              className="form-input stat-input-small"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
