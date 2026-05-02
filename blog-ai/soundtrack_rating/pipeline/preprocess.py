from sklearn.preprocessing import StandardScaler
from pipeline.clean_data import clean_data
from pipeline.feature_engineering import feature_engineering
from pipeline import config

def preprocess():
    df = clean_data()

    # Feature Engineering
    df = feature_engineering(df)

    # Select features
    X = df[config.FEATURE_COLUMNS]
    y = df[config.TARGET_COLUMN]

    # Scale
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    return X_scaled, y