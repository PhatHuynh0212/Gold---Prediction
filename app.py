from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Tải mô hình
model = joblib.load('best_model.pkl')

# Route mặc định
@app.route('/')
def home():
    return "Flask server is running!!!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        # Log dữ liệu nhận được
        print(f"Received data: {data}")

        # Chuyển đổi dữ liệu đầu vào thành mảng numpy để dự đoán
        input_features = np.array([[
            float(data['Open']),
            float(data['High']),
            float(data['Low']),
            float(data['crude_oil']),
            float(data['euro']),
            float(data['Stocks']),
            float(data['usb']),
            float(data['usd'])
        ]])
        # Log các tính năng đã chuyển đổi
        print(f"Input features: {input_features}")

        prediction = model.predict(input_features)
        # Log dự đoán
        print(f"Prediction: {prediction[0]}")
        return jsonify({'price': prediction[0]})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)