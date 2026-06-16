from services.keyword_service import get_keywords

def recommend_keywords(skill: str):

    return {
        "skill": skill,
        "keywords": get_keywords(skill)
    }