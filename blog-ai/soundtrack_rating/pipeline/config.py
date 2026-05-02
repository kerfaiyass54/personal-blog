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