from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Creature(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    dr = db.Column(db.Integer, nullable=False)

    shp = db.Column(db.Integer, nullable=False)
    dhp = db.Column(db.Integer, nullable=False)
    stamina = db.Column(db.Integer, nullable=False)

    # Defenses
    chill_def = db.Column(db.Integer, nullable=False)
    energy_def = db.Column(db.Integer, nullable=False)
    heat_def = db.Column(db.Integer, nullable=False)
    physical_def = db.Column(db.Integer, nullable=False)
    psychic_def = db.Column(db.Integer, nullable=False)

    # Subtraits
    speed = db.Column(db.Integer, nullable=False)
    dexterity = db.Column(db.Integer, nullable=False)
    power = db.Column(db.Integer, nullable=False)
    fortitude = db.Column(db.Integer, nullable=False)

    engineering = db.Column(db.Integer, nullable=False)
    memory = db.Column(db.Integer, nullable=False)
    resolve = db.Column(db.Integer, nullable=False)
    awareness = db.Column(db.Integer, nullable=False)

    portrayal = db.Column(db.Integer, nullable=False)
    stunt = db.Column(db.Integer, nullable=False)
    appeal = db.Column(db.Integer, nullable=False)
    language = db.Column(db.Integer, nullable=False)

    # B&D ratings
    dodge_rating = db.Column(db.Integer, nullable=False)
    block_rating = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        """Convert creature object to dictionary for JSON responses"""
        return {
            'id': self.id,

            'name': self.name,
            'dr': self.dr,

            'shp': self.shp,
            'dhp': self.dhp,
            'stamina': self.stamina,

            'chill_def': self.chill_def,
            'energy_def': self.stamina,
            'heat_def': self.heat_def,
            'physical_def': self.physical_def,
            'psychic_def': self.psychic_def,

            'speed': self.speed,
            'dexterity': self.dexterity,
            'power': self.power,
            'fortitude': self.fortitude,

            'engineering': self.engineering,
            'memory': self.memory,
            'resolve': self.resolve,
            'awareness': self.awareness,

            'portrayal': self.portrayal,
            'stunt': self.stunt,
            'appeal': self.appeal,
            'language': self.language,

            'dodge_rating': self.dodge_rating,
            'block_rating': self.block_rating
        }

    def __repr__(self):
        return f'<Creature *{self.id}: {self.name}>'
