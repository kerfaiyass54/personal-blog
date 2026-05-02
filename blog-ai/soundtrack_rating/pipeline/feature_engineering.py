import numpy as np
import pandas as pd

def feature_engineering(df: pd.DataFrame) -> pd.DataFrame:

    # -----------------------------
    # 1. Log Transform
    # -----------------------------
    df["log_Sales"] = np.log1p(df["Sales"])
    df["log_Radio Plays"] = np.log1p(df["Radio Plays"])

    # -----------------------------
    # 2. Ratio Feature
    # -----------------------------
    df["radio_to_sales"] = df["Radio Plays"] / (df["Sales"] + 1)

    # -----------------------------
    # 3. Artist Mean Encoding
    # -----------------------------
    artist_mean = df.groupby("Artist")["Rating"].mean()
    df["artist_rating_avg"] = df["Artist"].map(artist_mean)

    return df