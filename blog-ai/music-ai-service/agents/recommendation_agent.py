from services.data_loader_service import DataLoaderService

from services.preprocessing_service import (
    PreprocessingService
)

from services.feature_engineering_service import (
    FeatureEngineeringService
)

from services.vectorization_service import (
    VectorizationService
)

from services.recommendation_service import (
    RecommendationService
)

from services.mongodb_service import (
    MongoDBService
)


class RecommendationAgent:

    def __init__(self):

        self.mongo_service = MongoDBService()

        self.data_loader = DataLoaderService()

        self.preprocessing = PreprocessingService()

        self.feature_engineering = (
            FeatureEngineeringService()
        )

        self.vectorization = (
            VectorizationService()
        )

        self.recommendation_service = (
            RecommendationService()
        )

        print("Loading datasets...")

        self.df = self.data_loader.load_data()

        print("Preprocessing...")

        self.df = self.preprocessing.preprocess(
            self.df
        )

        print("Building features...")

        self.df = (
            self.feature_engineering.build_features(
                self.df
            )
        )

        print("Vectorizing...")

        self.matrix = (
            self.vectorization.fit_transform(
                self.df
            )
        )

        print("AI recommendation system ready.")

    # -----------------------------------
    # MAIN METHOD
    # -----------------------------------

    def recommend(
        self,
        email
    ):

        # -----------------------------------
        # FIND USER
        # -----------------------------------

        user = self.mongo_service.find_user_by_email(
            email
        )

        if not user:

            return []

        user_id = str(user["_id"])

        # -----------------------------------
        # FIND USER SOUNDTRACKS
        # -----------------------------------

        soundtracks = (
            self.mongo_service
            .find_user_soundtracks(user_id)
        )

        if not soundtracks:

            return []

        # -----------------------------------
        # GENERATE RECOMMENDATIONS
        # -----------------------------------

        recommendations = (
            self.recommendation_service
            .recommend_for_user_tracks(
                soundtracks,
                self.df,
                self.matrix
            )
        )

        return recommendations