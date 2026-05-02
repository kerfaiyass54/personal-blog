from sklearn.model_selection import train_test_split
from pipeline import config


def split_data(X, y):
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=config.TEST_SIZE,
        random_state=config.RANDOM_STATE
    )

    print("[INFO] Data split completed")
    print(f"[INFO] X_train: {X_train.shape}, X_test: {X_test.shape}")

    return X_train, X_test, y_train, y_test