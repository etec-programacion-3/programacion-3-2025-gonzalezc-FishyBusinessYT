import json
from jsonschema import validate, ValidationError

with open('schema.json', 'r') as f:
    CREATURE_SCHEMA = json.load(f)

def validate_creature_data(data):
    try: 
        validate(instance=data, schema=CREATURE_SCHEMA)
        return True, None
    except ValidationError as e:
        path = '.'.join(str(prop) for prop in e.path) if e.path else 'root'
        error_msg = f"In field {path}: {e.message}"
        return False, error_msg
