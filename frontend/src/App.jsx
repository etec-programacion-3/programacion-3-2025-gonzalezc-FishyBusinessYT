import { useState, useEffect } from 'react';
import './styles/App.css';

// API Service
const API_BASE_URL = 'http://localhost:3001';

const api = {
  getAllCreatures: async () => {
    const response = await fetch(`${API_BASE_URL}/creatures`);
    if (!response.ok) {
      throw new Error('Failed to fetch creatures');
    }
    return response.json();
  }
};

// CreatureCard Component
function CreatureCard({ creature }) {
  return (
    <div className="creature-card">
      <h3 className="creature-name">{creature.name}</h3>
      <p className="creature-description">{creature.description}</p>
    </div>
  );
}

// CreatureList Component
function CreatureList() {
  const [creatures, setCreatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <CreatureCard key={creature.id} creature={creature} />
      ))}
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Creature Collection</h1>
        <p>Your custom board game creatures</p>
      </header>
      <main className="app-main">
        <CreatureList />
      </main>
    </div>
  );
}
