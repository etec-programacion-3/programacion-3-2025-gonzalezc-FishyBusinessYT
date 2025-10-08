from flask import request, jsonify
from models import db, Creature, Stat, Action, Harvestable, Passive
from validation import validate_creature_data

def get_all_creatures():
    creatures = Creature.query.all()
    return jsonify([creature.to_dict() for creature in creatures])


def get_creature(creature_id):
    creature = Creature.query.get_or_404(creature_id)
    return jsonify(creature.to_dict())


def search_creatures():
    name = request.args.get('name', '')
    creatures = Creature.query.filter(Creature.name.ilike(f'%{name}%')).all()
    return jsonify([creature.to_dict() for creature in creatures])


def create_creature():
    """Create a new creature"""
    data = request.get_json()

    # Validate against JSON schema
    is_valid, error_message = validate_creature_data(data)
    if not is_valid:
        return jsonify({'error': f'Validation error: {error_message}'}), 400

    try:
        # Create the creature
        creature = Creature(
            name=data['name'],
            description=data['description']
        )
        db.session.add(creature)
        db.session.flush()  # Get the creature ID without committing

        # Create stats
        for stat_name, stat_value in data['stats'].items():
            stat = Stat(
                creature_id=creature.id,
                name=stat_name,
                value=stat_value
            )
            db.session.add(stat)

        # Create actions
        for action_data in data['actions']:
            action = Action(
                creature_id=creature.id,
                turn_actions=action_data['turn_actions'],
                stamina=action_data['stamina'],
                range=action_data['range'],
                damage_dice=action_data['damage']['dice'],
                damage_dice_faces=action_data['damage']['faces'],
                damage_modifier=action_data['damage']['modifier'],
                damage_type=action_data['damage']['type'],
                notes=action_data['damage'].get('notes', '')
            )
            db.session.add(action)

        # Create harvestables (loot)
        for loot_data in data['loot']:
            harvestable = Harvestable(
                creature_id=creature.id,
                yield_dice=loot_data['dice'],
                yield_dice_faces=loot_data['faces'],
                requires_test=loot_data['requires_test'],
                type=loot_data['type']
            )
            db.session.add(harvestable)

        # Handle passives (reuse existing, create new ones)
        for passive_name in data['passives']:
            # Try to find existing passive
            passive = Passive.query.filter_by(name=passive_name).first()

            if not passive:
                # Create new passive if it doesn't exist
                passive = Passive(
                    name=passive_name,
                    description=''  # Empty description for now
                )
                db.session.add(passive)
                db.session.flush()  # Get the passive ID

            # Link passive to creature
            creature.passives.append(passive)

        # Commit all changes
        db.session.commit()

        return jsonify(creature.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500


def update_creature(creature_id):
    creature = Creature.query.get_or_404(creature_id)
    data = request.get_json()

    # Update fields if provided
    # TODO: Update this to handle nested relationships
    if 'name' in data:
        creature.name = data['name']
    if 'description' in data:
        creature.description = data['description']

    db.session.commit()
    return jsonify(creature.to_dict())


def delete_creature(creature_id):
    creature = Creature.query.get_or_404(creature_id)
    db.session.delete(creature)
    db.session.commit()
    return jsonify({'message': 'Creature deleted successfully'})
