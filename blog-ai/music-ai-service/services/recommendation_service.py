from sklearn.metrics.pairwise import cosine_similarity

from utils.text_cleaner import clean_text


class RecommendationService:

    def recommend_for_user_tracks(
        self,
        user_tracks,
        df,
        matrix,
        top_k=10
    ):

        recommendations = []

        already_seen = set()

        # -----------------------------------
        # LOOP USER TRACKS
        # -----------------------------------

        for track in user_tracks:

            raw_title = track.get("title", "")

            title = clean_text(raw_title)

            print(f"Searching for: {title}")

            # -----------------------------------
            # FIND MATCH
            # -----------------------------------

            matched = df[
                df["title"].str.contains(
                    title,
                    case=False,
                    na=False
                )
            ]

            print(f"Matches found: {len(matched)}")

            if matched.empty:
                continue

            idx = matched.index[0]

            similarity_scores = cosine_similarity(
                matrix[idx],
                matrix
            )

            scores = list(
                enumerate(similarity_scores[0])
            )

            scores = sorted(
                scores,
                key=lambda x: x[1],
                reverse=True
            )

            # -----------------------------------
            # BUILD RECOMMENDATIONS
            # -----------------------------------

            for i in scores[1:top_k + 1]:

                item = df.iloc[i[0]]

                key = (
                    item["title"],
                    item["author"]
                )

                if key in already_seen:
                    continue

                already_seen.add(key)

                recommendations.append({
                    "title": item["title"],
                    "author": item["author"],
                    "source": item["source"]
                })

        return recommendations[:top_k]