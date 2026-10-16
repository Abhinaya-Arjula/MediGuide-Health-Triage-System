import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import "../styles/result.css";
function Result() {

    const location = useLocation();
    const navigate = useNavigate();

    const result = location.state?.result;
    const [aiExplanation, setAiExplanation] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    if (!result) {
        return (
            <div>
                <h2>No assessment result found.</h2>

                <button onClick={() => navigate("/triage")}>
                    Start Assessment
                </button>
            </div>
        );
    }

    const getAIExplanation = async () => {
        setAiLoading(true);

        try {
            const response = await api.post("/ai/explain", {
                level: result.level,
                doctor: result.doctorType
            });

            setAiExplanation(response.data);

        } catch (error) {
            console.error("AI ERROR:", error);
            setAiExplanation(
                "AI explanation is temporarily unavailable."
            );
        } finally {
            setAiLoading(false);
        }
    };
    return (
        <div className="result-page">

            <div className="result-card">
                <div className="ai-section">
                    <h2>🤖 AI Health Explanation</h2>

                    <button onClick={getAIExplanation} disabled={aiLoading}>
                        {aiLoading ? "Generating Explanation..." : "Get AI Explanation"}
                    </button>

                    {aiExplanation && (
                        <p>{aiExplanation}</p>
                    )}
                </div>

                <h1>Health Assessment Result</h1>

                <div className="risk-section">

                    <h2>Risk Level</h2>

                    <div className="risk-level">
                        {result.level || "Unknown"}

                    </div>

                </div>

                <div className="doctor-section">

                    <h2>Recommended Doctor</h2>

                    <p>
                        👨‍⚕️ {result.doctorType}
                    </p>

                </div>

                <div className="result-warning">

                    <p>
                        This assessment is for informational
                        purposes and does not replace professional
                        medical advice.
                    </p>

                </div>

                <div className="result-actions">

                    <button
                        onClick={() => navigate("/triage")}
                    >
                        New Assessment
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Result;