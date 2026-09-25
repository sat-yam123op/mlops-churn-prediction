const API_URL = "https://churn-api-wfg4.onrender.com/predict";

const form = document.getElementById("churnForm");
const predictBtn = document.getElementById("predictBtn");

const loading = document.getElementById("loading");
const result = document.getElementById("result");
const error = document.getElementById("error");

const predictionText = document.getElementById("prediction");
const probabilityText = document.getElementById("probability");


form.addEventListener("submit", async function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Hide previous messages
    result.classList.add("hidden");
    error.classList.add("hidden");

    // Show loading
    loading.classList.remove("hidden");
    predictBtn.disabled = true;
    predictBtn.textContent = "Predicting...";


    // Collect form data
    const customerData = {

        gender: document.getElementById("gender").value,

        SeniorCitizen:
            parseInt(document.getElementById("SeniorCitizen").value),

        Partner:
            document.getElementById("Partner").value,

        Dependents:
            document.getElementById("Dependents").value,

        tenure:
            parseInt(document.getElementById("tenure").value),

        PhoneService:
            document.getElementById("PhoneService").value,

        MultipleLines:
            document.getElementById("MultipleLines").value,

        InternetService:
            document.getElementById("InternetService").value,

        OnlineSecurity:
            document.getElementById("OnlineSecurity").value,

        OnlineBackup:
            document.getElementById("OnlineBackup").value,

        DeviceProtection:
            document.getElementById("DeviceProtection").value,

        TechSupport:
            document.getElementById("TechSupport").value,

        StreamingTV:
            document.getElementById("StreamingTV").value,

        StreamingMovies:
            document.getElementById("StreamingMovies").value,

        Contract:
            document.getElementById("Contract").value,

        PaperlessBilling:
            document.getElementById("PaperlessBilling").value,

        PaymentMethod:
            document.getElementById("PaymentMethod").value,

        MonthlyCharges:
            parseFloat(document.getElementById("MonthlyCharges").value),

        TotalCharges:
            parseFloat(document.getElementById("TotalCharges").value)
    };


    try {

        // Send data to FastAPI
        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(customerData)
        });


        // Check API response
        if (!response.ok) {
            throw new Error(
                `API request failed: ${response.status}`
            );
        }


        // Convert response to JSON
        const data = await response.json();


        // Display prediction
        predictionText.textContent = data.prediction;


        // Convert probability to percentage
        const probability =
            (data.churn_probability * 100).toFixed(2);

        probabilityText.textContent =
            `${probability}%`;


        // Show result
        result.classList.remove("hidden");

    }

    catch (err) {

        console.error(err);

        error.textContent =
            "Unable to connect to the prediction API. Please try again.";

        error.classList.remove("hidden");
    }

    finally {

        // Hide loading
        loading.classList.add("hidden");

        // Enable button
        predictBtn.disabled = false;

        predictBtn.textContent = "Predict Churn";
    }

});