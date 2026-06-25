import json


def parse_json(content: str):

    try:
        return json.loads(content)

    except Exception:
        return {
            "mistakes": []
        }