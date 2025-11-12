import { useState, useEffect } from 'react';
import { api } from '../services/api';
import BasicInfoSection from './form/BasicInfoSection';
import StatsSection from './form/StatsSection';
import PassivesSection from './form/PassivesSection';
import ActionsSection from './form/ActionsSection';
import LootSection from './form/LootSection';
import '../styles/CreatureForm.css';

const getInitialFormData = () => ({
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

export default function CreatureForm({ editingCreatureId, onBackToDetail }) {
  const [formData, setFormData] = useState(getInitialFormData());
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = !!editingCreatureId;

  // Load creature data when editing
  useEffect(() => {
    if (editingCreatureId) {
      loadCreatureData();
    } else {
      setFormData(getInitialFormData());
    }
  }, [editingCreatureId]);

  const loadCreatureData = async () => {
    try {
      setIsLoading(true);
      const creature = await api.getCreature(editingCreatureId);
      
      // Convert stats array to object
      const statsObj = creature.stats.reduce((acc, stat) => {
        acc[stat.name] = stat.value;
        return acc;
      }, {});

      // Convert passives array to just names
      const passiveNames = creature.passives.map(p => p.name);

      // Transform actions to match form structure
      const transformedActions = creature.actions.map(action => ({
        turn_actions: action.turn_actions,
        stamina: action.stamina,
        range: action.range,
        damage: {
          dice: action.damage_dice,
          faces: action.damage_dice_faces,
          modifier: action.damage_modifier,
          type: action.damage_type,
          notes: action.notes || ''
        }
      }));

      // Transform harvestables to loot structure
      const transformedLoot = creature.harvestables.map(h => ({
        dice: h.yield_dice,
        faces: h.yield_dice_faces,
        requires_test: h.requires_test,
        type: h.type
      }));

      setFormData({
        name: creature.name,
        description: creature.description,
        stats: statsObj,
        passives: passiveNames,
        actions: transformedActions,
        loot: transformedLoot
      });
    } catch (error) {
      setResponseMessage(`✗ Error loading creature: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage('');

    try {
      if (isEditMode) {
        await api.updateCreature(editingCreatureId, formData);
        setResponseMessage('✓ Creature updated successfully!');
        
        // Navigate back to detail view after a short delay
        setTimeout(() => {
          if (onBackToDetail) {
            onBackToDetail(editingCreatureId);
          }
        }, 1000);
      } else {
        await api.createCreature(formData);
        setResponseMessage('✓ Creature created successfully!');
        
        // Reset form for create mode
        setFormData(getInitialFormData());
      }
    } catch (error) {
      setResponseMessage(`✗ Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isEditMode && onBackToDetail) {
      onBackToDetail(editingCreatureId);
    }
  };

  if (isLoading) {
    return (
      <div className="creature-form">
        <div className="loading">Loading creature data...</div>
      </div>
    );
  }

  return (
    <form className="creature-form" onSubmit={handleSubmit}>
      <h1 className="form-title">
        {isEditMode ? 'Edit Creature' : 'Create New Creature'}
      </h1>

      <BasicInfoSection 
        formData={formData} 
        setFormData={setFormData} 
      />

      <StatsSection 
        stats={formData.stats} 
        setFormData={setFormData} 
      />

      <PassivesSection 
        passives={formData.passives} 
        setFormData={setFormData} 
      />

      <ActionsSection 
        actions={formData.actions} 
        setFormData={setFormData} 
      />

      <LootSection 
        loot={formData.loot} 
        setFormData={setFormData} 
      />

      <div className="form-submit-section">
        {responseMessage && (
          <div className={`message ${responseMessage.startsWith('✓') ? 'message-success' : 'message-error'}`}>
            {responseMessage}
          </div>
        )}

        <div className="form-button-group">
          {isEditMode && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-flex-grow"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            {isSubmitting 
              ? (isEditMode ? 'Updating Creature...' : 'Creating Creature...') 
              : (isEditMode ? 'Update Creature' : 'Create Creature')
            }
          </button>
        </div>
      </div>
    </form>
  );
}
