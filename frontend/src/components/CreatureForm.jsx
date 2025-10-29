import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

export default function CreatureUploadForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stats: {
      dr: 1, shp: 1, dhp: 1, stamina: 1,
      chilld: 0, energyd: 0, heatd: 0, physicald: 0, psychicd: 0,
      speed: 1, dexterity: 1, power: 1, fortitude: 1,
      engineering: 1, memory: 1, resolve: 1, awareness: 1,
      portrayal: 1, stunt: 1, appeal: 1, language: 1,
      blockr: 1, dodger: 1
    },
    passives: [],
    actions: [],
    loot: []
  });

  const [newPassive, setNewPassive] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const damageTypes = [
    'Physical', 'Energy', 'Heat', 'Chill', 'Psychic', 'None'
  ];

  const lootTypes = [
    { value: 1, label: 'Common' },
    { value: 2, label: 'Uncommon' },
    { value: 3, label: 'Rare' }
  ];

  const handleStatChange = (stat, value) => {
    setFormData(prev => ({
      ...prev,
      stats: { ...prev.stats, [stat]: parseFloat(value) || 0 }
    }));
  };

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResponseMessage('');

    try {
      const response = await fetch('/api/creatures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setResponseMessage('✓ Creature created successfully!');
        setFormData({
          name: '',
          description: '',
          stats: {
            dr: 1, shp: 1, dhp: 1, stamina: 1,
            chilld: 0, energyd: 0, heatd: 0, physicald: 0, psychicd: 0,
            speed: 1, dexterity: 1, power: 1, fortitude: 1,
            engineering: 1, memory: 1, resolve: 1, awareness: 1,
            portrayal: 1, stunt: 1, appeal: 1, language: 1,
            blockr: 1, dodger: 1
          },
          passives: [],
          actions: [],
          loot: []
        });
      } else {
        const error = await response.json();
        setResponseMessage(`✗ Error: ${error.message || 'Failed to create creature'}`);
      }
    } catch (error) {
      setResponseMessage(`✗ Network error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 border border-purple-500">
          <h1 className="text-3xl font-bold text-purple-300 mb-6 text-center">
            Create New Creature
          </h1>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-purple-400">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  maxLength={50}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-purple-400">Stats</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(formData.stats).map(stat => (
                  <div key={stat}>
                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase">
                      {stat}
                    </label>
                    <input
                      type="number"
                      value={formData.stats[stat]}
                      onChange={(e) => handleStatChange(stat, e.target.value)}
                      min={['chilld', 'energyd', 'heatd', 'physicald', 'psychicd'].includes(stat) ? undefined : 1}
                      className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-purple-400">Passive Abilities</h2>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPassive}
                  onChange={(e) => setNewPassive(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addPassive()}
                  maxLength={50}
                  placeholder="Enter passive ability..."
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={addPassive}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded flex items-center gap-2 transition-colors"
                >
                  <Plus size={16} /> Add
                </button>
              </div>

              <div className="space-y-2">
                {formData.passives.map((passive, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-700 p-2 rounded">
                    <span className="flex-1 text-gray-300">{passive}</span>
                    <button
                      type="button"
                      onClick={() => removePassive(idx)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-purple-400">Actions</h2>
                <button
                  type="button"
                  onClick={addAction}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded flex items-center gap-2 text-sm transition-colors"
                >
                  <Plus size={14} /> Add Action
                </button>
              </div>

              {formData.actions.map((action, idx) => (
                <div key={idx} className="bg-slate-700 p-4 rounded space-y-3 border border-slate-600">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-purple-300">Action {idx + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeAction(idx)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Turn Actions</label>
                      <input
                        type="number"
                        value={action.turn_actions}
                        onChange={(e) => updateAction(idx, 'turn_actions', parseFloat(e.target.value) || 0)}
                        min={0}
                        className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Stamina</label>
                      <input
                        type="number"
                        value={action.stamina}
                        onChange={(e) => updateAction(idx, 'stamina', parseFloat(e.target.value) || 0)}
                        min={0}
                        className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Range</label>
                      <input
                        type="number"
                        value={action.range}
                        onChange={(e) => updateAction(idx, 'range', parseFloat(e.target.value) || 0)}
                        min={0}
                        className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-600 pt-3">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Damage</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Dice</label>
                        <input
                          type="number"
                          value={action.damage.dice}
                          onChange={(e) => updateAction(idx, 'damage.dice', parseFloat(e.target.value) || 1)}
                          min={1}
                          className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Faces</label>
                        <input
                          type="number"
                          value={action.damage.faces}
                          onChange={(e) => updateAction(idx, 'damage.faces', parseFloat(e.target.value) || 1)}
                          min={1}
                          className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Modifier</label>
                        <input
                          type="number"
                          value={action.damage.modifier}
                          onChange={(e) => updateAction(idx, 'damage.modifier', parseFloat(e.target.value) || 0)}
                          min={0}
                          max={18}
                          className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Type</label>
                        <select
                          value={action.damage.type}
                          onChange={(e) => updateAction(idx, 'damage.type', parseInt(e.target.value))}
                          className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                        >
                          {damageTypes.map((type, i) => (
                            <option key={i} value={i}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs text-gray-400 mb-1">Notes</label>
                        <input
                          type="text"
                          value={action.damage.notes}
                          onChange={(e) => updateAction(idx, 'damage.notes', e.target.value)}
                          className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-purple-400">Loot</h2>
                <button
                  type="button"
                  onClick={addLoot}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded flex items-center gap-2 text-sm transition-colors"
                >
                  <Plus size={14} /> Add Loot
                </button>
              </div>

              {formData.loot.map((loot, idx) => (
                <div key={idx} className="bg-slate-700 p-4 rounded border border-slate-600">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-purple-300">Loot {idx + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeLoot(idx)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Dice</label>
                      <input
                        type="number"
                        value={loot.dice}
                        onChange={(e) => updateLoot(idx, 'dice', parseFloat(e.target.value) || 1)}
                        min={1}
                        className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Faces</label>
                      <input
                        type="number"
                        value={loot.faces}
                        onChange={(e) => updateLoot(idx, 'faces', parseFloat(e.target.value) || 1)}
                        min={1}
                        className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Type</label>
                      <select
                        value={loot.type}
                        onChange={(e) => updateLoot(idx, 'type', parseInt(e.target.value))}
                        className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                      >
                        {lootTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={loot.requires_test}
                          onChange={(e) => updateLoot(idx, 'requires_test', e.target.checked)}
                          className="w-4 h-4"
                        />
                        Requires Test
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-600">
              {responseMessage && (
                <div className={`mb-4 p-3 rounded ${responseMessage.startsWith('✓') ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                  {responseMessage}
                </div>
              )}
              
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Save size={20} />
                {isSubmitting ? 'Creating Creature...' : 'Create Creature'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
