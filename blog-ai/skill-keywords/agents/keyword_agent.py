from services.keyword_service import get_keywords

class KeywordAgent:

    def run(self, skill):

        return {
            "skill": skill,
            "keywords": get_keywords(skill)
        }