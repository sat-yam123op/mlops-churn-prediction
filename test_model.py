import joblib

# Load the trained model
model = joblib.load("model/churn_model.pkl")

print("Model loaded successfully!")
print("Model type:", type(model))