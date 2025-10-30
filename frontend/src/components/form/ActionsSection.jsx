import ActionCard from '../form/ActionCard';

export default function ActionsSection({ actions, setFormData }) {
  const addAction = () => {
    setFormData(prev => ({
      ...prev,
      actions: [...prev.actions, {
        turn_actions: 0,
        stamina: 0,
        range: 0,
        damage: {
          dice: 1,
          faces: 6,
          modifier: 0,
          type: 0,
          notes: ''
        }
      }]
    }));
  };

  const updateAction = (index, field, value) => {
    setFormData(prev => {
      const newActions = [...prev.actions];
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        newActions[index][parent][child] = value;
      } else {
        newActions[index][field] = value;
      }
      return { ...prev, actions: newActions };
    });
  };

  const removeAction = (index) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="section-title">Actions</h2>
        <button
          type="button"
          onClick={addAction}
          className="btn btn-secondary btn-small"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Action
        </button>
      </div>

      {actions.map((action, idx) => (
        <ActionCard
          key={idx}
          action={action}
          index={idx}
          updateAction={updateAction}
          removeAction={removeAction}
        />
      ))}
    </div>
  );
}
