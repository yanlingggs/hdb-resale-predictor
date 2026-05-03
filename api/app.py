from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

model = joblib.load("models/xgb_model.pkl")
feature_columns = joblib.load("models/feature_columns.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    input_df = pd.DataFrame([{
        'floor_area_sqm': data['floor_area_sqm'],
        'lease_commence_date': data['lease_commence_date'],
        'storey_mid': data['storey_mid'],
        'town': data['town'],
        'flat_type': data['flat_type'],
        'flat_model': data['flat_model']
    }])

    input_df = pd.get_dummies(input_df)
    input_df = input_df.reindex(columns=feature_columns, fill_value=0)

    prediction = model.predict(input_df)
    return jsonify({'predicted_price': round(float(prediction), 2)})

@app.route("/health", methods=["GET"])
def health():
    return jsonify({'status':'ok'})

if __name__ == "__main__":
    app.run(debug=True, port=5001)

