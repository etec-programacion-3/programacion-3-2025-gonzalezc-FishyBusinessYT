import Header from './components/Header';
import CreatureGrid from './components/CreatureGrid';
import './styles/App.css';

// Main App Component
export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <CreatureGrid/>
      </main>
    </div>
  );
}
