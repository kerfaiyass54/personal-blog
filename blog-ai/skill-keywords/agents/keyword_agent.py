from collections import Counter

import pandas as pd


class KeywordAgent:

    def __init__(self):

        self.df = pd.read_csv("datasets/job_dataset.csv")

        self.df.fillna(
            "",
            inplace=True
        )

    def run(
            self,
            skill: str
    ):

        skill = skill.lower().strip()

        matching_rows = self.df[
            self.df["Skills"]
            .str.lower()
            .str.contains(
                skill,
                na=False
            )
        ]

        if matching_rows.empty:

            return {
                "skill": skill,
                "keywords": []
            }

        counter = Counter()

        for keywords in matching_rows["Keywords"]:

            for keyword in str(keywords).split(";"):

                keyword = keyword.strip().lower()

                if keyword:

                    counter[keyword] += 1

        recommended_keywords = [
            keyword
            for keyword, _
            in counter.most_common(30)
        ]

        return {
            "skill": skill,
            "keywords": recommended_keywords
        }