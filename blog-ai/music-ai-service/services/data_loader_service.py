import pandas as pd


class DataLoaderService:

    def load_data(self):

        spotify_df = pd.read_csv(
            "data/Spotify Million Song Dataset_exported.csv"
        )

        youtube_df = pd.read_csv(
            "data/youtube-top-100-songs-2025.csv"
        )

        # -------------------------
        # Normalize Spotify Dataset
        # -------------------------

        spotify_df = spotify_df.rename(columns={
            "song": "title",
            "artist": "author",
            "text": "description"
        })

        spotify_df["categories"] = ""
        spotify_df["tags"] = ""
        spotify_df["source"] = "SPOTIFY"

        spotify_df = spotify_df[
            [
                "title",
                "author",
                "description",
                "categories",
                "tags",
                "source"
            ]
        ]

        # -------------------------
        # Normalize YouTube Dataset
        # -------------------------

        youtube_df = youtube_df.rename(columns={
            "channel": "author"
        })

        youtube_df["source"] = "YOUTUBE"

        youtube_df = youtube_df[
            [
                "title",
                "author",
                "description",
                "categories",
                "tags",
                "source"
            ]
        ]

        # -------------------------
        # Merge datasets
        # -------------------------

        final_df = pd.concat(
            [spotify_df, youtube_df],
            ignore_index=True
        )

        final_df = final_df.fillna("")

        return final_df