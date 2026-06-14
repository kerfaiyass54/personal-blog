class DiscoveryAgent:

    def __init__(
        self,
        graph_service
    ):

        self.graph_service = graph_service

    def discover(self, skill):

        return self.graph_service.get_related_skills(
            skill
        )