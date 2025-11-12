import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CreatureForm from './components/CreatureForm';
import CreatureGrid from './components/CreatureGrid';
import CreatureDetail from './components/CreatureDetail';
import './styles/App.css';

// Main App Component
export default function App() {
  const [currentView, setCurrentView] = useState('grid');
  const [selectedCreatureId, setSelectedCreatureId] = useState(null);
  const [editingCreatureId, setEditingCreatureId] = useState(null);

  const handleCreatureSelect = (creatureId) => {
    setSelectedCreatureId(creatureId);
    setCurrentView('detail');
  };

  const handleNavigate = (view) => {
    setSelectedCreatureId(null);
    setEditingCreatureId(null);
    setCurrentView(view);
  };

  const handleEditCreature = (creatureId) => {
    setEditingCreatureId(creatureId);
    setCurrentView('form');
  };

  const handleBackToDetail = (creatureId) => {
    setSelectedCreatureId(creatureId);
    setEditingCreatureId(null);
    setCurrentView('detail');
  };

  return (
    <div className="app">
      <Header />
      <Navigation currentView={currentView} onNavigate={handleNavigate} />
      <main className="app-main">
        {currentView === 'grid' && (
          <CreatureGrid onCreatureSelect={handleCreatureSelect} />
        )}
        {currentView === 'form' && (
          <CreatureForm 
            editingCreatureId={editingCreatureId}
            onBackToDetail={handleBackToDetail}
          />
        )}
        {currentView === 'detail' && (
          <CreatureDetail 
            creatureId={selectedCreatureId}
            onEdit={handleEditCreature}
          />
        )}
      </main>
    </div>
  );
}
