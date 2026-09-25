from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

# Create FastAPI application
app = FastAPI(
    title="Customer Churn Prediction API",
    description="ML API for predicting customer churn",
    version="1.0"
)

# Allow frontend to communicate with API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = joblib.load("model/churn_model.pkl")


@app.get("/")
def home():
    return {
        "message": "Customer Churn Prediction API is running"
    }


@app.post("/predict")
def predict(customer: dict):

    # Convert incoming JSON to DataFrame
    data = pd.DataFrame([customer])

    # Make prediction
    prediction = model.predict(data)[0]

    # Get churn probability
    probability = model.predict_proba(data)[0][1]

    prediction = int(prediction)
    probability = float(probability)

    if prediction == 1:
        result = "Churn"
    else:
        result = "No Churn"

    return {
        "prediction": result,
        "churn_probability": round(probability, 4)
    }