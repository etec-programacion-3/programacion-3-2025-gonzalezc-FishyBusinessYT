from flask import Flask, request, jsonify
from models import db, Creature

app = Flask(__name__)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///creatures.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Create tables when app starts
with app.app_context():
    db.create_all()

# CRUD Routes

@app.route('/creatures', methods=['GET'])
def get_all_creatures():
    """Get all creatures"""
    creatures = Creature.query.all()
    return jsonify([creature.to_dict() for creature in creatures])

@app.route('/creatures/<int:creature_id>', methods=['GET'])
def get_creature(creature_id):
    """Get a specific creature by ID"""
    creature = Creature.query.get_or_404(creature_id)
    return jsonify(creature.to_dict())

@app.route('/creatures', methods=['POST'])
def create_creature():
    """Create a new creature"""
    data = request.get_json()

    # Basic validation
    required_fields = ['name', 'difficulty_rating', 'shp', 'dhp']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    creature = Creature(
        name=data['name'],
        difficulty_rating=data['difficulty_rating'],
        shp=data['shp'],
        dhp=data['dhp']
    )

    db.session.add(creature)
    db.session.commit()

    return jsonify(creature.to_dict()), 201

@app.route('/creatures/<int:creature_id>', methods=['PUT'])
def update_creature(creature_id):
    """Update an existing creature"""
    creature = Creature.query.get_or_404(creature_id)
    data = request.get_json()

    # Update fields if provided
    if 'name' in data:
        creature.name = data['name']
    if 'difficulty_rating' in data:
        creature.difficulty_rating = data['difficulty_rating']
    if 'shp' in data:
        creature.shp = data['shp']
    if 'dhp' in data:
        creature.dhp = data['dhp']

    db.session.commit()
    return jsonify(creature.to_dict())

@app.route('/creatures/<int:creature_id>', methods=['DELETE'])
def delete_creature(creature_id):
    """Delete a creature"""
    creature = Creature.query.get_or_404(creature_id)
    db.session.delete(creature)
    db.session.commit()
    return jsonify({'message': 'Creature deleted successfully'})

@app.route('/creatures/search', methods=['GET'])
def search_creatures():
    """Search creatures by name"""
    name = request.args.get('name', '')
    creatures = Creature.query.filter(Creature.name.ilike(f'%{name}%')).all()
    return jsonify([creature.to_dict() for creature in creatures])

if __name__ == '__main__':
    app.run(debug=True)
