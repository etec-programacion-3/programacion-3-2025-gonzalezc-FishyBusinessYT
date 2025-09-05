from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Creature(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    difficulty_rating = db.Column(db.Integer, nullable=False)
    shp = db.Column(db.Integer, nullable=False)
    dhp = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        """Convert creature object to dictionary for JSON responses"""
        return {
            'id': self.id,
            'name': self.name,
            'difficulty_rating': self.difficulty_rating,
            'shp': self.shp,
            'dhp': self.dhp
        }

    def __repr__(self):
        return f'<Creature {self.name}>'
