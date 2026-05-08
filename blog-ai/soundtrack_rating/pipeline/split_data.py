from sklearn.model_selection import train_test_split

from config import *


def split_data(df):

    X = df[FEATURE_COLUMNS]

    y = df[TARGET_COLUMN]

    return train_test_split(
        X,
        y,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE
    )