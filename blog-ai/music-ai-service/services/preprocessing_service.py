from utils.text_cleaner import clean_text


class PreprocessingService:

    def preprocess(self, df):

        columns = [
            "title",
            "author",
            "description",
            "categories",
            "tags"
        ]

        for col in columns:
            df[col] = df[col].apply(clean_text)

        return df