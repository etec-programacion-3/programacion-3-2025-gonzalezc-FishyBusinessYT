import { useState, useEffect } from 'react';
import { api } from '../services/api';
import CreatureCard from './CreatureCard';
import '../styles/CreatureGrid.css';

// CreatureGrid Component
export default function CreatureGrid() {
  const [creatures, setCreatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch creatures asynchronously
  useEffect(() => {
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

    fetchCreatures();
  }, []);

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

  // Return the HTML thing
  return (
    <div className="creature-grid">
      {creatures.map((creature) => (
        <CreatureCard key={creature.id} creature={creature} />
      ))}
    </div>
  );
}
