import '../styles/Navigation.css';

export default function Navigation({ currentView, onNavigate }) {
  return (
    <nav className="navigation">
      <button
        className={`nav-button ${currentView === 'grid' ? 'active' : ''}`}
        onClick={() => onNavigate('grid')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        View Creatures
      </button>
      
      <button
        className={`nav-button ${currentView === 'form' ? 'active' : ''}`}
        onClick={() => onNavigate('form')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Create Creature
      </button>
    </nav>
  );
}
