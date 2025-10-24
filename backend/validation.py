import json
from jsonschema import validate, ValidationError

with open('post_schema.json', 'r') as f:
    CREATURE_POST_SCHEMA = json.load(f)

with open('put_schema.json', 'r') as f:
    CREATURE_PUT_SCHEMA = json.load(f)

def validate_creature_data(data, is_update=False):
    try:
        schema = CREATURE_PUT_SCHEMA if is_update else CREATURE_POST_SCHEMA
        validate(instance=data, schema=schema)
        return True, None
    except ValidationError as e:
        path = '.'.join(str(prop) for prop in e.path) if e.path else 'root'
        error_msg = f"In field {path}: {e.message}"
        return False, error_msg
