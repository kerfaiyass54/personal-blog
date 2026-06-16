import pickle

with open(
    "models/skill_keywords.pkl",
    "rb"
) as f:

    SKILL_DICT = pickle.load(f)

def get_keywords(skill: str):

    skill = skill.lower().strip()

    return SKILL_DICT.get(skill, [])