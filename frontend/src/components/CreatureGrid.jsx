import { useState, useEffect } from 'react';
import { api } from '../services/api';
import CreatureCard from './CreatureCard';
import '../styles/CreatureGrid.css';

export default function CreatureGrid() {
  const [creatures, setCreatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch creatures asynchronously
  useEffect(() => {
    fetchCreatures();
  }, []);

  const fetchCreatures = async () => {
    try {
      setLoading(true);
      const data = await api.getAllCreatures();
      setCreatures(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (creatureId) => {
    try {
      await api.deleteCreature(creatureId);
      fetchCreatures();
    } catch (err) {
      throw new Error('Failed to delete creature: ' + err.message);
    }
  };

  // Display errors and state
  if (loading) {
    return <div className="loading">Loading creatures...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (creatures.length === 0) {
    return <div className="empty">No creatures found. Add some to get started!</div>;
  }

  return (
    <div className="creature-grid">
      {creatures.map((creature) => (
        <CreatureCard 
          key={creature.id} 
          creature={creature}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
