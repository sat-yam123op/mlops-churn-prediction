import joblib
import pandas as pd

# Load trained model
model = joblib.load("model/churn_model.pkl")

# Sample customer data
customer = pd.DataFrame([{
    "gender": "Female",
    "SeniorCitizen": 0,
    "Partner": "Yes",
    "Dependents": "No",
    "tenure": 12,
    "PhoneService": "Yes",
    "MultipleLines": "No",
    "InternetService": "DSL",
    "OnlineSecurity": "No",
    "OnlineBackup": "Yes",
    "DeviceProtection": "No",
    "TechSupport": "No",
    "StreamingTV": "No",
    "StreamingMovies": "No",
    "Contract": "Month-to-month",
    "PaperlessBilling": "Yes",
    "PaymentMethod": "Electronic check",
    "MonthlyCharges": 70.5,
    "TotalCharges": 846.0
}])

# Make prediction
prediction = model.predict(customer)[0]

# Get probability
probability = model.predict_proba(customer)[0][1]

print("Prediction:", prediction)
print("Churn probability:", round(probability, 4))