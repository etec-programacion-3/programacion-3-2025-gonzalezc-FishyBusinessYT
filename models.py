from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Junction table for the many-to-may relationship between creatures and passive features:
creatures_passives = db.Table('creatures_passives',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('creature_id', db.Integer, db.ForeignKey('creatures.id'), nullable=False),
    db.Column('passive_id', db.Integer, db.ForeignKey('passives.id'), nullable=False)
)

class Creature(db.Model):
    __tablename__ = 'creatures'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)

    # Relationships
    stats = db.relationship('Stat', backref='creature', lazy=True, cascade='all, delete-orphan')
    actions = db.relationship('Action', backref='creature', lazy=True, cascade='all, delete-orphan')
    harvestables = db.relationship('Harvestable', backref='creature', lazy=True, cascade='all, delete-orphan')
    passives = db.relationship('Passive', secondary='creatures_passives', backref='creatures')

    def __repr__(self):
        return f'<Creature *{self.id}: {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'stats': [stat.to_dict() for stat in self.stats],
            'actions': [action.to_dict() for action in self.actions],
            'harvestables': [harvestable.to_dict() for harvestable in self.harvestables],
            'passives': [passive.to_dict() for passive in self.passives]
        }

class Stat(db.Model):
    __tablename__ = 'stats'

    id = db.Column(db.Integer, primary_key=True)
    creature_id = db.Column(db.Integer, db.ForeignKey('creatures.id'), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    value = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Stat {self.name} for creature *{self.creature_id} of value {self.value}>'

    def to_dict(self):
        return {
            'id': self.id,
            'creature_id': self.creature_id,
            'name': self.name,
            'value': self.value
        }

class Action(db.Model):
    __tablename__ = 'actions'

    id = db.Column(db.Integer, primary_key=True)
    creature_id = db.Column(db.Integer, db.ForeignKey('creatures.id'), nullable=False)
    turn_actions = db.Column(db.Integer, nullable=False)
    stamina = db.Column(db.Integer, nullable=False)
    range = db.Column(db.Integer, nullable=False)
    damage_dice = db.Column(db.Integer, nullable=False)
    damage_dice_faces = db.Column(db.Integer, nullable=False)
    damage_modifier = db.Column(db.Integer, nullable=False)
    damage_type = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.Text)

    def __repr__(self):
        return f'<Action *{self.id} for creature *{self.creature_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'creature_id': self.creature_id,
            'turn_actions': self.turn_actions,
            'stamina': self.stamina,
            'range': self.range,
            'damage_dice': self.damage_dice,
            'damage_dice_faces': self.damage_dice_faces,
            'damage_modifier': self.damage_modifier,
            'damage_type': self.damage_type,
            'notes': self.notes
        }

class Harvestable(db.Model):
    __tablename__ = 'harvestables'

    id = db.Column(db.Integer, primary_key=True)
    creature_id = db.Column(db.Integer, db.ForeignKey('creatures.id'), nullable=False)
    yield_dice = db.Column(db.Integer, nullable=False)
    yield_dice_faces = db.Column(db.Integer, nullable=False)
    requires_test = db.Column(db.Boolean, nullable=False)
    type = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Harvestable *{self.id} for creature *{self.creature_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'creature_id': self.creature_id,
            'yield_dice': self.yield_dice,
            'yield_dice_faces': self.yield_dice_faces,
            'requires_test': self.requires_test,
            'type': self.type
        }


class Passive(db.Model):
    __tablename__ = 'passives'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)

    def __repr__(self):
        return f'<Passive feature *{self.id}: {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }
