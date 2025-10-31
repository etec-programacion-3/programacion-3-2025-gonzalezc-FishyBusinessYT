import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CreatureForm from './components/CreatureForm';
import CreatureGrid from './components/CreatureGrid';
import './styles/App.css';

// Main App Component
export default function App() {
  const [currentView, setCurrentView] = useState('grid');

  return (
    <div className="app">
      <Header />
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      <main className="app-main">
        {currentView === 'grid' ? <CreatureGrid /> : <CreatureForm />}
      </main>
    </div>
  );
}
