import '../styles/CreatureCard.css';

export default function CreatureCard({ creature }) {
  return (
    <div className="creature-card">
      <h3 className="creature-name">{creature.name}</h3>
      <p className="creature-description">{creature.description}</p>
    </div>
  );
}
