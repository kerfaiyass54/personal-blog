# ===============================
# 📁 FILE PATHS
# ===============================
DATA_PATH = "data/Song.csv"

# ===============================
# 🎯 TARGET
# ===============================
TARGET_COLUMN = "Rating"

# ===============================
# DROP RAW COLUMNS
# ===============================
DROP_COLUMNS = ["Title"]

# ===============================
# BASE NUMERICAL FEATURES
# ===============================
BASE_NUMERICAL = [
    "Year",
    "Sales",
    "Streams",
    "Downloads",
    "Radio Plays"
]

# ===============================
# FINAL FEATURES (after FE)
# ===============================
FEATURE_COLUMNS = [
    "Year",
    "log_Sales",
    "log_Radio Plays",
    "radio_to_sales",
    "artist_rating_avg"
]

# ===============================
# SPLIT
# ===============================
TEST_SIZE = 0.2
RANDOM_STATE = 42

# ===============================
# 🔑 API KEYS
# ===============================
SPOTIFY_CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID"
SPOTIFY_CLIENT_SECRET = "YOUR_SPOTIFY_SECRET"
YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY"

# ===============================
# 🟡 KAFKA
# ===============================

TOPIC_INPUT = "soundtrack-input"
TOPIC_ENRICHED = "soundtrack-enriched"
TOPIC_RATED = "soundtrack-rated"

# ===============================
# 🔴 ELASTICSEARCH
# ===============================
KAFKA_BOOTSTRAP = "host.docker.internal:29092"
ELASTIC_URL = "http://host.docker.internal:9205"
INDEX_NAME = "soundtracks"

# ===============================
# 🤖 MODEL PATHS
# ===============================
MODEL_PATH = "models/random_forest_model.pkl"