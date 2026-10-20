import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";

function History() {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const response = await api.get("/triage/history");
                const data = response.data;

                const items = Array.isArray(data)
                    ? data
                    : data?.history ?? data?.content ?? [];

                setHistory(items);

                if (items.length === 0) {
                    setError("No assessment history found.");
                }
            } catch (err) {
                console.error("History request failed:", err);
                setError(
                    err.response?.data?.message ||
                    `Unable to load history (${err.response?.status ?? "connection error"}).`
                );
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, []);

    return (
        <main style={{ padding: "24px" }}>
            <h1>Assessment History</h1>

            {loading && <p>Loading assessment history...</p>}
            {error && !loading && <p role="alert">{error}</p>}

            {history.map((item, index) => (
                <article key={item.id ?? index}
                         style={{ border: "1px solid #ddd", padding: "12px", marginTop: "12px" }}>
                    <p><strong>Date:</strong> {item.createdAt ?? item.date ?? "Not provided"}</p>
                    <p><strong>Symptoms:</strong> {item.symptoms ?? "Not provided"}</p>
                    <p><strong>Risk level:</strong> {item.riskLevel ?? item.risk ?? "Not provided"}</p>
                </article>
            ))}

            <button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
            </button>
        </main>
    );
}

export default History;