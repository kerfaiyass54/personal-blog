import pandas as pd
import pickle
from collections import defaultdict

df = pd.read_csv("../datasets/job_dataset.csv")

skill_dict = defaultdict(list)

for _, row in df.iterrows():

    skills = str(row["Skills"]).split(";")
    keywords = str(row["Keywords"]).split(";")

    for skill in skills:

        skill = skill.strip().lower()

        for keyword in keywords:

            keyword = keyword.strip().lower()

            if keyword not in skill_dict[skill]:
                skill_dict[skill].append(keyword)

with open("../models/skill_keywords.pkl", "wb") as f:
    pickle.dump(dict(skill_dict), f)

print("Dictionary saved")