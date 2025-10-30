export default function BasicInfoSection({ formData, setFormData }) {
  return (
    <div className="form-section">
      <h2 className="section-title">Basic Information</h2>

      <div className="form-group">
        <label className="form-label">Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          maxLength={50}
          required
          className="form-input"
          placeholder="Enter creature name"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
          className="form-textarea"
          placeholder="Describe your creature..."
        />
      </div>
    </div>
  );
}
