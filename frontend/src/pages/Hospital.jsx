import { useState } from "react";
import api from "../services/api";

function Hospital() {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const findHospitals = async () => {
        setLoading(true);
        setError("");
        setHospitals([]);

        try {
            const response = await api.get("/hospitals/nearby");
            const data = response.data;

            const items = Array.isArray(data)
                ? data
                : data?.hospitals ?? data?.content ?? [];

            setHospitals(items);

            if (items.length === 0) {
                setError("No hospitals were returned. We need to check the backend hospital API.");
            }
        } catch (err) {
            console.error("Hospital request failed:", err);
            setError(
                err.response?.data?.message ||
                `Unable to load hospitals (${err.response?.status ?? "connection error"}).`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ padding: "24px" }}>
            <h1>Nearby Hospitals</h1>
            <p>Find hospitals using the MediGuide hospital service.</p>

            <button onClick={findHospitals} disabled={loading}>
                {loading ? "Searching..." : "Find Hospitals"}
            </button>

            {error && <p role="alert">{error}</p>}

            {hospitals.map((hospital, index) => (
                <article key={hospital.id ?? hospital.name ?? index}
                         style={{ border: "1px solid #ddd", padding: "12px", marginTop: "12px" }}>
                    <h2>{hospital.name ?? hospital.display_name ?? "Hospital"}</h2>
                    <p>
                        <strong>Address:</strong>{" "}
                        {hospital.address || "Address not yet verified"}
                    </p>

                    <p>
                        <strong>Latitude:</strong> {hospital.latitude}
                    </p>

                    <p>
                        <strong>Longitude:</strong> {hospital.longitude}
                    </p>                </article>
            ))}

            <button onClick={() => window.location.href = "/dashboard"}>
                Back to Dashboard
            </button>
        </main>
    );
}

export default Hospital;