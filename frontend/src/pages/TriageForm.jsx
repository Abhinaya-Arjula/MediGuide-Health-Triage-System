import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function TriageForm() {

    const navigate = useNavigate();

    const [temperature, setTemperature] = useState("");
    const [oxygen, setOxygen] = useState("");
    const [heartRate, setHeartRate] = useState("");
    const [bloodPressure, setBloodPressure] = useState("");
    const [painLevel, setPainLevel] = useState("");
    const [symptoms, setSymptoms] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            const response = await api.post("/triage/analyze", {
                temperature: Number(temperature),
                oxygen: Number(oxygen),
                heartRate: Number(heartRate),
                bloodPressure: bloodPressure,
                painLevel: Number(painLevel),
                symptoms: symptoms
            });

            console.log("TRIAGE RESPONSE:", response.data);

            navigate("/dashboard", {
                state: {
                    result: response.data
                }
            });

        } catch (error) {

            console.error("TRIAGE ERROR:", error);

            if (error.response) {

                setMessage(
                    "Error " +
                    error.response.status +
                    ": " +
                    JSON.stringify(error.response.data)
                );

            } else if (error.request) {

                setMessage(
                    "Backend is not responding. Make sure Spring Boot is running on port 8081."
                );

            } else {

                setMessage("Error: " + error.message);

            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>
            <h1>Health Assessment</h1>

            <p>
                Enter your symptoms and vital signs for assessment.
            </p>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Temperature (°F)</label>

                    <input
                        type="number"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Oxygen Level (%)</label>

                    <input
                        type="number"
                        value={oxygen}
                        onChange={(e) => setOxygen(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Heart Rate (BPM)</label>

                    <input
                        type="number"
                        value={heartRate}
                        onChange={(e) => setHeartRate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Blood Pressure</label>

                    <input
                        type="text"
                        placeholder="120/80"
                        value={bloodPressure}
                        onChange={(e) => setBloodPressure(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Pain Level (0-10)</label>

                    <input
                        type="number"
                        min="0"
                        max="10"
                        value={painLevel}
                        onChange={(e) => setPainLevel(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Symptoms</label>

                    <textarea
                        placeholder="Describe your symptoms..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Analyze My Health"}
                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}

        </div>
    );
}

export default TriageForm;