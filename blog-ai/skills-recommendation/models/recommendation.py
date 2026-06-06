class Recommendation:

    def __init__(
            self,
            skill_name,
            field,
            recommendations
    ):
        self.skill_name = skill_name
        self.field = field
        self.recommendations = recommendations

    def to_dict(self):

        return {
            "skillName": self.skill_name,
            "field": self.field,
            "recommendations": self.recommendations
        }