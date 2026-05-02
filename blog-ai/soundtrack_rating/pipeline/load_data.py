import pandas as pd
from pipeline import config


def load_data():
    df = pd.read_csv(config.DATA_PATH)
    return df