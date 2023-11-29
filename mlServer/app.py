from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the model and feature names
model = joblib.load('../assets/precipitation_prediction_model.joblib')
feature_names = joblib.load('../assets/feature_names.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Ensure features are in the same order as feature_names
        features = [data['features'][name] for name in feature_names]

        # Make prediction
        prediction = model.predict([features])[0]

        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
