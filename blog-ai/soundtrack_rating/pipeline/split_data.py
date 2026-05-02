from sklearn.model_selection import train_test_split
from pipeline import config

def split_data(X, y):
    return train_test_split(
        X, y,
        test_size=config.TEST_SIZE,
        random_state=config.RANDOM_STATE
    )