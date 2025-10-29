from flask import Flask
from flask_cors import CORS
from models import db
import config
import creature_routes

app = Flask(__name__)
CORS(app)

# Set database path
app.config['SQLALCHEMY_DATABASE_URI'] = config.DATABASE_URI

# Initialize database
db.init_app(app)

# Add routes
app.add_url_rule(
    '/creatures', 'get_all_creatures',
    creature_routes.get_all_creatures, methods=['GET']
    )
app.add_url_rule(
    '/creatures/<int:creature_id>', 'get_creature',
    creature_routes.get_creature, methods=['GET']
    )
app.add_url_rule(
    '/creatures/search', 'search_creatures',
    creature_routes.search_creatures, methods=['GET']
    )
app.add_url_rule(
    '/creatures', 'create_creature',
    creature_routes.create_creature, methods=['POST']
    )
app.add_url_rule(
    '/creatures/<int:creature_id>', 'update_creature',
    creature_routes.update_creature, methods=['PUT']
    )
app.add_url_rule(
    '/creatures/<int:creature_id>', 'delete_creature',
    creature_routes.delete_creature, methods=['DELETE']
    )

# Create tables when app starts
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host=config.IP, port=config.PORT)
