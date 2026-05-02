from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor

from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

from pipeline.preprocess import preprocess
from pipeline.split_data import split_data


def evaluate(name, model, X_train, X_test, y_train, y_test):
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)

    print(f"\n{name}")
    print("-" * 30)
    print(f"MAE: {mae:.2f}")
    print(f"RMSE: {rmse:.2f}")
    print(f"R2: {r2:.4f}")


def main():
    X, y = preprocess()
    X_train, X_test, y_train, y_test = split_data(X, y)

    evaluate("Linear Regression", LinearRegression(), X_train, X_test, y_train, y_test)

    evaluate("Random Forest", RandomForestRegressor(n_estimators=100), X_train, X_test, y_train, y_test)

    evaluate("XGBoost", XGBRegressor(n_estimators=100), X_train, X_test, y_train, y_test)


if __name__ == "__main__":
    main()