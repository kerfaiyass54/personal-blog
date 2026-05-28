class FeatureEngineeringService:

    def build_features(self, df):

        df["combined_features"] = (
            df["title"] + " " +
            df["author"] + " " +
            df["description"] + " " +
            df["categories"] + " " +
            df["tags"]
        )

        return df