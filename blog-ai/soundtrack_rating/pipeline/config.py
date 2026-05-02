# ===============================
# 📁 FILE PATHS
# ===============================
DATA_PATH = "data/dataset.csv"

# Optional: future outputs
CLEAN_DATA_PATH = "data/clean_data.csv"
PROCESSED_DATA_PATH = "data/processed_data.csv"
MODEL_PATH = "models/model.pkl"


# ===============================
# 🎯 TARGET VARIABLE
# ===============================
TARGET_COLUMN = "popularity"


# ===============================
# 🧹 COLUMNS TO DROP
# ===============================
DROP_COLUMNS = [
    "Unnamed: 0",
    "track_id",
    "track_name",
    "album_name",
    "artists"
]


# ===============================
# 🔢 NUMERICAL FEATURES
# ===============================
NUMERICAL_COLUMNS = [
    "duration_ms",
    "danceability",
    "energy",
    "loudness",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "liveness",
    "valence",
    "tempo"
]


# ===============================
# 🔘 BOOLEAN / BINARY FEATURES
# ===============================
BINARY_COLUMNS = [
    "explicit"
]


# ===============================
# 🏷️ CATEGORICAL FEATURES
# ===============================
CATEGORICAL_COLUMNS = [
    "track_genre"
]


# ===============================
# ⚙️ OUTLIER HANDLING
# ===============================
OUTLIER_COLUMNS = NUMERICAL_COLUMNS  # apply IQR on all numeric features
IQR_MULTIPLIER = 1.5


# ===============================
# 📊 TRAIN-TEST SPLIT
# ===============================
TEST_SIZE = 0.2
RANDOM_STATE = 42


# ===============================
# ⚖️ SCALING
# ===============================
SCALER_TYPE = "standard"  # options: standard, minmax


# ===============================
# 🧪 MISSING VALUE STRATEGY
# ===============================
DROP_THRESHOLD = 0.8  # drop rows with <80% non-null values

FILL_VALUES = {
    "track_genre": "unknown",
    "artists": "unknown"
}


# ===============================
# 🧠 MODEL CONFIG (for later)
# ===============================
MODEL_TYPE = "random_forest"

RF_PARAMS = {
    "n_estimators": 100,
    "max_depth": None,
    "random_state": RANDOM_STATE
}