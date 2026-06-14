import networkx as nx


class SkillGraphBuilder:

    def __init__(self):

        self.graph = nx.Graph()

    def build(self, relation_df):

        source_col = relation_df.columns[0]
        target_col = relation_df.columns[1]

        for _, row in relation_df.iterrows():

            self.graph.add_edge(
                str(row[source_col]),
                str(row[target_col])
            )

        return self.graph

    def get_related_skills(
        self,
        skill,
        limit=20
    ):

        if skill not in self.graph:
            return []

        return list(
            self.graph.neighbors(skill)
        )[:limit]