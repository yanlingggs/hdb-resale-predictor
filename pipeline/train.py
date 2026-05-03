import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from xgboost import XGBRegressor
import joblib
import os

def train():
    df = pd.read_csv("data/clean_hdb.csv")

    df = df.drop(columns=['month', 'block', 'street_name', 'remaining_lease_years'])
    df = pd.get_dummies(df, columns=['town', 'flat_type', 'flat_model'])

    X = df.drop(columns=['resale_price'])
    y = df['resale_price']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    lr_model = LinearRegression()
    lr_model.fit(X_train, y_train)
    y_pred_lr = lr_model.predict(X_test)
    rmse_lr = np.sqrt(mean_squared_error(y_test, y_pred_lr))
    r2_lr = r2_score(y_test, y_pred_lr)
    print(f"Linear Regression RMSE: ${rmse_lr:,.0f} | R²: {r2_lr:.4f}")

    xgb_model = XGBRegressor(n_estimators=300, max_depth=5, learning_rate=0.2, random_state=42)
    xgb_model.fit(X_train, y_train)
    y_pred_xgb = xgb_model.predict(X_test)
    rmse_xgb = np.sqrt(mean_squared_error(y_test, y_pred_xgb))
    r2_xgb = r2_score(y_test, y_pred_xgb)
    print(f"XGBoost RMSE: ${rmse_xgb:,.0f} | R²: {r2_xgb:.4f}")

    os.makedirs("models", exist_ok=True)
    joblib.dump(xgb_model, "models/xgb_model.pkl")
    joblib.dump(X_train.columns.tolist(), "models/feature_columns.pkl")
    print("Model saved to models/xgb_model.pkl")

if __name__ == "__main__":
    train()
