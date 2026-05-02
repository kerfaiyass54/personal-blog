import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler

from pipeline import config
from pipeline.clean_data import clean_data


# ===============================
# 🎯 SELECT FEATURES
# ===============================
def select_features(df: pd.DataFrame):
    X = df[
        config.NUMERICAL_COLUMNS +
        config.BINARY_COLUMNS +
        config.CATEGORICAL_COLUMNS
        ]

    y = df[config.TARGET_COLUMN]

    return X, y


# ===============================
# 🏷️ ENCODE CATEGORICAL VARIABLES
# ===============================
def encode_categorical(X: pd.DataFrame) -> pd.DataFrame:
    X = pd.get_dummies(
        X,
        columns=config.CATEGORICAL_COLUMNS,
        drop_first=True
    )
    return X


# ===============================
# ⚖️ SCALE FEATURES
# ===============================
def scale_features(X: pd.DataFrame):
    if config.SCALER_TYPE == "standard":
        scaler = StandardScaler()
    elif config.SCALER_TYPE == "minmax":
        scaler = MinMaxScaler()
    else:
        raise ValueError("Invalid scaler type in config")

    X_scaled = scaler.fit_transform(X)

    return X_scaled, scaler


# ===============================
# 🚀 FULL PREPROCESS PIPELINE
# ===============================
def preprocess():
    # Load + clean
    df = clean_data()

    # Select features
    X, y = select_features(df)

    # Encode categorical
    X = encode_categorical(X)

    # Scale features
    X, scaler = scale_features(X)

    print("[INFO] Preprocessing completed")
    print(f"[INFO] Features shape: {X.shape}")

    return X, y, scaler