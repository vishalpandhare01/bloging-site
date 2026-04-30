import base64
import json

def encode_cursor(created_at, id):
    payload = {
        "created_at": created_at.isoformat(),
        "id": str(id)
    }
    return base64.urlsafe_b64encode(json.dumps(payload).encode()).decode()

def decode_cursor(cursor: str):
    try:
        decoded = base64.urlsafe_b64decode(cursor.encode()).decode()
        return json.loads(decoded)
    except Exception:
        return None