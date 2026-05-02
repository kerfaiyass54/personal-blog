import joblib
import os

from sklearn.ensemble import RandomForestRegressor

from pipeline.preprocess import preprocess
from pipeline.split_data import split_data


# ===============================
# 📁 MODEL SAVE PATH
# ===============================
MODEL_DIR = "models"
MODEL_PATH = os.path.join(MODEL_DIR, "random_forest_model.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")


# ===============================
# 🚀 TRAIN FUNCTION
# ===============================
def train_and_save():
    print("[INFO] Starting training...")

    # Load data
    X, y = preprocess()
    X_train, X_test, y_train, y_test = split_data(X, y)

    # Best model (tuned)
    model = RandomForestRegressor(
        n_estimators=300,
        max_depth=10,
        min_samples_split=5,
        random_state=42,
        n_jobs=-1
    )

    # Train
    model.fit(X_train, y_train)

    print("[INFO] Training completed")

    # Create models directory if not exists
    os.makedirs(MODEL_DIR, exist_ok=True)

    # Save model
    joblib.dump(model, MODEL_PATH)

    print(f"[INFO] Model saved at: {MODEL_PATH}")
    print(f"[INFO] Scaler saved at: {SCALER_PATH}")


# ===============================
# ▶️ RUN
# ===============================
if __name__ == "__main__":
    train_and_save()