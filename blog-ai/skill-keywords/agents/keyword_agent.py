class KeywordAgent:

    def __init__(
        self,
        graph_service,
        cooccurrence_service
    ):

        self.graph = graph_service
        self.co = cooccurrence_service

    def generate(
        self,
        skill
    ):

        graph_keywords = (
            self.graph.get_related_skills(skill)
        )

        co_keywords = (
            self.co.top_related(
                self.co.counter,
                skill
            )
        )

        keywords = list(
            dict.fromkeys(
                graph_keywords + co_keywords
            )
        )

        return keywords[:20]