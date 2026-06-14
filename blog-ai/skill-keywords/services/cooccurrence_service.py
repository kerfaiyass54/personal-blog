from collections import Counter


class CoOccurrenceService:

    def build(self, dataframe):

        counter = {}

        for _, row in dataframe.iterrows():

            skills = str(
                row.iloc[-1]
            ).split(",")

            skills = [
                s.strip()
                for s in skills
                if s.strip()
            ]

            for skill in skills:

                if skill not in counter:
                    counter[skill] = Counter()

                for related in skills:

                    if related != skill:
                        counter[skill][related] += 1

        return counter

    def top_related(
        self,
        counter,
        skill,
        limit=15
    ):

        if skill not in counter:
            return []

        return [
            s
            for s, _
            in counter[skill].most_common(limit)
        ]