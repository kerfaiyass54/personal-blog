import pandas as pd
from pipeline import config
from pipeline.load_data import load_data


# ===============================
# 🧹 DROP COLUMNS
# ===============================
def drop_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop(columns=config.DROP_COLUMNS, errors='ignore')


# ===============================
# 🔁 REMOVE DUPLICATES
# ===============================
def remove_duplicates(df: pd.DataFrame) -> pd.DataFrame:
    df = df.drop_duplicates()
    if "track_id" in df.columns:
        df = df.drop_duplicates(subset=["track_id"])
    return df


# ===============================
# ❌ HANDLE MISSING VALUES
# ===============================
def handle_missing_values(df: pd.DataFrame) -> pd.DataFrame:
    # Drop rows where target is missing
    df = df.dropna(subset=[config.TARGET_COLUMN])

    # Drop rows with too many missing values
    threshold = int(len(df.columns) * config.DROP_THRESHOLD)
    df = df.dropna(thresh=threshold)

    # Fill remaining values
    df = df.fillna(config.FILL_VALUES)

    return df


# ===============================
# 🔄 CONVERT DATA TYPES
# ===============================
def convert_types(df: pd.DataFrame) -> pd.DataFrame:
    # Convert boolean to int
    for col in config.BINARY_COLUMNS:
        if col in df.columns:
            df[col] = df[col].astype(int)

    # Convert numeric columns
    for col in config.NUMERICAL_COLUMNS + [config.TARGET_COLUMN]:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')

    return df


# ===============================
# 🚫 REMOVE OUTLIERS (IQR)
# ===============================
def remove_outliers(df: pd.DataFrame) -> pd.DataFrame:
    for col in config.OUTLIER_COLUMNS:
        if col not in df.columns:
            continue

        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1

        lower = Q1 - config.IQR_MULTIPLIER * IQR
        upper = Q3 + config.IQR_MULTIPLIER * IQR

        df = df[(df[col] >= lower) & (df[col] <= upper)]

    return df


# ===============================
# 🚀 MAIN CLEANING PIPELINE
# ===============================
def clean_data() -> pd.DataFrame:
    df = load_data()

    df = drop_columns(df)
    df = remove_duplicates(df)
    df = handle_missing_values(df)
    df = convert_types(df)
    df = remove_outliers(df)

    print("[INFO] Data cleaned successfully")
    print(f"[INFO] Final shape: {df.shape}")

    return df