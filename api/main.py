from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import joblib
import pandas as pd
import os

# Create FastAPI application
app = FastAPI(
    title="Customer Churn Prediction API",
    description="ML API for predicting customer churn",
    version="1.0"
)

# Load trained model
model = joblib.load("model/churn_model.pkl")


# -----------------------------
# API HOME
# -----------------------------
@app.get("/api")
def api_home():
    return {
        "message": "Customer Churn Prediction API is running"
    }


# -----------------------------
# PREDICTION API
# -----------------------------
@app.post("/predict")
def predict(customer: dict):

    # Convert incoming JSON to DataFrame
    data = pd.DataFrame([customer])

    # Make prediction
    prediction = model.predict(data)[0]

    # Get churn probability
    probability = model.predict_proba(data)[0][1]

    # Convert NumPy values to Python values
    prediction = int(prediction)
    probability = float(probability)

    # Convert prediction to readable label
    if prediction == 1:
        result = "Churn"
    else:
        result = "No Churn"

    return {
        "prediction": result,
        "churn_probability": round(probability, 4)
    }


# -----------------------------
# FRONTEND
# -----------------------------
frontend_path = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "frontend"
)

app.mount(
    "/",
    StaticFiles(directory=frontend_path, html=True),
    name="frontend"
)