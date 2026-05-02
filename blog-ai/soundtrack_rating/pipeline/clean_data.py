import pandas as pd
from pipeline import config
from pipeline.load_data import load_data

def clean_data():
    df = load_data()

    df = df.drop(columns=config.DROP_COLUMNS, errors="ignore")
    df = df.drop_duplicates()
    df = df.dropna()

    return df