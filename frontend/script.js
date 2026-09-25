// ==========================================
// Customer Churn Prediction - Frontend JS
// ==========================================

// Deployed FastAPI endpoint
const API_URL = "/predict";

// Get HTML elements
const form = document.getElementById("churnForm");
const predictBtn = document.getElementById("predictBtn");

const loading = document.getElementById("loading");
const result = document.getElementById("result");
const error = document.getElementById("error");

const predictionText = document.getElementById("prediction");
const probabilityText = document.getElementById("probability");


// ==========================================
// Form Submit
// ==========================================

form.addEventListener("submit", async function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Hide old results/errors
    result.classList.add("hidden");
    error.classList.add("hidden");

    // Show loading
    loading.classList.remove("hidden");

    // Disable button while prediction is running
    predictBtn.disabled = true;
    predictBtn.textContent = "Predicting...";


    // ==========================================
    // Collect Customer Data
    // ==========================================

    const customerData = {

        gender: document.getElementById("gender").value,

        SeniorCitizen: parseInt(
            document.getElementById("SeniorCitizen").value
        ),

        Partner: document.getElementById("Partner").value,

        Dependents: document.getElementById("Dependents").value,

        tenure: parseInt(
            document.getElementById("tenure").value
        ),

        PhoneService: document.getElementById("PhoneService").value,

        MultipleLines: document.getElementById("MultipleLines").value,

        InternetService: document.getElementById("InternetService").value,

        OnlineSecurity: document.getElementById("OnlineSecurity").value,

        OnlineBackup: document.getElementById("OnlineBackup").value,

        DeviceProtection: document.getElementById("DeviceProtection").value,

        TechSupport: document.getElementById("TechSupport").value,

        StreamingTV: document.getElementById("StreamingTV").value,

        StreamingMovies: document.getElementById("StreamingMovies").value,

        Contract: document.getElementById("Contract").value,

        PaperlessBilling: document.getElementById("PaperlessBilling").value,

        PaymentMethod: document.getElementById("PaymentMethod").value,

        MonthlyCharges: parseFloat(
            document.getElementById("MonthlyCharges").value
        ),

        TotalCharges: parseFloat(
            document.getElementById("TotalCharges").value
        )
    };


    // ==========================================
    // Send Data to FastAPI
    // ==========================================

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(customerData)
        });


        // Check whether API returned an error
        if (!response.ok) {

            throw new Error(
                `API request failed with status ${response.status}`
            );
        }


        // Convert API response to JSON
        const data = await response.json();


        // ==========================================
        // Display Prediction
        // ==========================================

        predictionText.textContent = data.prediction;


        // Convert probability to percentage
        const probability =
            Number(data.churn_probability) * 100;


        probabilityText.textContent =
            probability.toFixed(2) + "%";


        // Show result
        result.classList.remove("hidden");

    }


    // ==========================================
    // Handle Errors
    // ==========================================

    catch (err) {

        console.error("Prediction error:", err);

        error.textContent =
            "Unable to connect to the prediction API. Please try again.";

        error.classList.remove("hidden");
    }


    // ==========================================
    // Reset Button
    // ==========================================

    finally {

        loading.classList.add("hidden");

        predictBtn.disabled = false;

        predictBtn.textContent = "Predict Churn";
    }

});