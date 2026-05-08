# ===============================
# 📁 FILE PATHS
# ===============================
DATA_PATH = "data/Song.csv"

# ===============================
# 🎯 TARGET
# ===============================
TARGET_COLUMN = "Rating"

# ===============================
# DROP COLUMNS
# ===============================
DROP_COLUMNS = ["Title"]

# ===============================
# FINAL FEATURES
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
# 🟡 KAFKA
# ===============================
TOPIC_INPUT = "soundtrack-input"
TOPIC_RATED = "soundtrack-rated"

KAFKA_BOOTSTRAP = "blog_kafka:29093"
# ===============================
# 🔴 ELASTICSEARCH
# ===============================
ELASTIC_URL = "http://blog-elasticsearch:9200"
INDEX_NAME = "soundtracks"

# ===============================
# 🤖 MODEL
# ===============================
MODEL_PATH = "models/random_forest_model.pkl"