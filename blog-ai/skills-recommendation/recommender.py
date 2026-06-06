from sentence_transformers import SentenceTransformer

from sklearn.metrics.pairwise import cosine_similarity

import numpy as np

from database import db

from config import SKILLS_COLLECTION

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def recommend(skill_name):

    skills = list(
        db[SKILLS_COLLECTION].find()
    )

    if not skills:
        return []

    documents = [

        f"{skill['name']} {skill['field']}"

        for skill in skills
    ]

    embeddings = model.encode(
        documents
    )

    target_index = None

    for i, skill in enumerate(skills):

        if skill["name"].lower() == skill_name.lower():

            target_index = i
            break

    if target_index is None:
        return []

    similarities = cosine_similarity(
        [embeddings[target_index]],
        embeddings
    )[0]

    ranked_indices = np.argsort(
        similarities
    )[::-1]

    recommendations = []

    for index in ranked_indices:

        if index == target_index:
            continue

        recommendations.append(
            skills[index]["name"]
        )

        if len(recommendations) == 5:
            break

    return recommendations