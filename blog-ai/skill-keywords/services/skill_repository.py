from rapidfuzz import process


class SkillRepository:

    def __init__(self, skills_df):

        self.skills = (
            skills_df["preferredLabel"]
            .dropna()
            .tolist()
        )

    def normalize(self, skill):

        result = process.extractOne(
            skill,
            self.skills
        )

        if result:
            return result[0]

        return skill