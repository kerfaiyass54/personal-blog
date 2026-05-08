import numpy as np

from config import *


def preprocess_data(df):

    # ===============================
    # DROP DUPLICATES
    # ===============================
    df = df.drop_duplicates()

    # ===============================
    # DROP NULLS
    # ===============================
    df = df.dropna()

    # ===============================
    # FEATURE ENGINEERING
    # ===============================

    df["log_Sales"] = np.log1p(df["Sales"])

    df["log_Radio Plays"] = np.log1p(df["Radio Plays"])

    df["radio_to_sales"] = (
        df["Radio Plays"] / (df["Sales"] + 1)
    )

    artist_avg = (
        df.groupby("Artist")["Rating"]
        .mean()
    )

    df["artist_rating_avg"] = (
        df["Artist"]
        .map(artist_avg)
    )

    return df