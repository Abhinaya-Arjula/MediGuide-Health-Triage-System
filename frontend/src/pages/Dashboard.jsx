import { useNavigate, useLocation} from "react-router-dom";
import "../styles/dashboard.css";
function Dashboard() {

    const navigate = useNavigate();
    const location = useLocation();
    const result = location.state?.result;

    const userEmail = localStorage.getItem("userEmail");

    const userName = userEmail
        ? userEmail.split("@")[0]
        : "User";
    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userEmail");

        navigate("/");
    };

    return (
        <div className="dashboard-page">

            <header className="dashboard-header">

                <div>
                    <h1>Health Triage</h1>
                    <p>AI-powered health assessment</p>
                </div>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </header>

            <main className="dashboard-content">

                <section className="welcome-section">

                    <h2>Welcome 👋, {userName}</h2>

                    <p>
                        {userEmail}
                    </p>

                    <p>
                        Check your symptoms and get an initial
                        health risk assessment.
                    </p>

                </section>
                {result && (
                    <section className="dashboard-card">
                        <h3>Latest Assessment Result</h3>

                        <pre style={{ whiteSpace: "pre-wrap" }}>
            {typeof result === "string"
                ? result
                : JSON.stringify(result, null, 2)}
        </pre>

                        <button
                            onClick={() =>
                                navigate("/result", {
                                    state: { result: result }
                                })
                            }
                        >
                            View Detailed Result
                        </button>
                    </section>
                )}

                <section className="dashboard-cards">

                    <div className="dashboard-card">

                        <h3>🩺 Health Assessment</h3>

                        <p>
                            Enter your symptoms and vital signs
                            to calculate your risk level.
                        </p>

                        <button
                            onClick={() => navigate("/triage")}
                        >
                            Start Assessment
                        </button>

                    </div>

                    <div className="dashboard-card">

                        <h3>📋 Assessment History</h3>

                        <p>
                            View your previous health assessments.
                        </p>

                        <button
                            onClick={() => navigate("/history")}
                        >
                            View History
                        </button>

                    </div>

                    <div className="dashboard-card">

                        <h3>🏥 Nearby Hospitals</h3>

                        <p>
                            Find nearby hospitals when needed.
                        </p>

                        <button
                            onClick={() => navigate("/hospital")}
                        >
                            Find Hospitals
                        </button>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;