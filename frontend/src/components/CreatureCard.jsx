import { useState } from 'react';
import '../styles/CreatureCard.css';

export default function CreatureCard({ creature, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent card click event

    if (!window.confirm(`Are you sure you want to delete "${creature.name}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(creature.id);
    } catch (error) {
      console.error('Error deleting creature:', error);
      alert('Failed to delete creature. Please try again.');
      setIsDeleting(false);
    }
  };

  const handleCardClick = () => {
    if (!isDeleting && onSelect) {
      onSelect(creature.id);
    }
  };

  return (
    <div 
      className={`creature-card ${isDeleting ? 'deleting' : ''}`}
      onClick={handleCardClick}
    >
      <div className="creature-card-header">
        <h3 className="creature-name">{creature.name}</h3>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="delete-button"
          title="Delete creature"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
      <p className="creature-description">{creature.description}</p>
    </div>
  );
}
