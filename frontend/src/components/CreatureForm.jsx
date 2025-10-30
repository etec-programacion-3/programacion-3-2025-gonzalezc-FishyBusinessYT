import { useState } from 'react';
import BasicInfoSection from './form/BasicInfoSection';
import StatsSection from './form/StatsSection';
import PassivesSection from './form/PassivesSection';
import ActionsSection from './form/ActionsSection';
import LootSection from './form/LootSection';
import '../styles/CreatureForm.css';

export default function CreatureForm() {
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

  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage('');

    try { //TODO use a service for this
      const response = await fetch('http://localhost:3001/creatures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setResponseMessage('✓ Creature created successfully!');
        // Reset form
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
        setResponseMessage(`✗ Error: ${error.error || 'Failed to create creature'}`);
      }
    } catch (error) {
      setResponseMessage(`✗ Network error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <form className="creature-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Create New Creature</h1>

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

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-full-width"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            {isSubmitting ? 'Creating Creature...' : 'Create Creature'}
          </button>
        </div>
      </form>
  );
}
