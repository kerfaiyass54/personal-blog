from sklearn.feature_extraction.text import TfidfVectorizer
import joblib
import os


class VectorizationService:

    def __init__(self):

        self.vectorizer = TfidfVectorizer(
            stop_words='english',
            max_features=5000
        )

    def fit_transform(self, df):

        matrix = self.vectorizer.fit_transform(
            df["combined_features"]
        )

        os.makedirs("models", exist_ok=True)

        joblib.dump(
            self.vectorizer,
            "models/vectorizer.pkl"
        )

        return matrix