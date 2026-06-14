class DescriptionAgent:

    def generate(
        self,
        skill,
        keywords
    ):

        top_keywords = ", ".join(
            keywords[:10]
        )

        return (
            f"{skill} is a software skill "
            f"commonly associated with "
            f"{top_keywords}. "
            f"It is widely used in modern "
            f"software engineering projects."
        )