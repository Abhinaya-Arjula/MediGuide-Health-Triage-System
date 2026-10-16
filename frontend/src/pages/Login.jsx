import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            setMessage(response.data);

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userEmail", email);

        } catch (error) {

            if (error.response) {
                setMessage(
                    error.response.data?.message ||
                    "Invalid email or password"
                );
            } else {
                setMessage(
                    "Cannot connect to the backend. Make sure Spring Boot is running."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-header">
                    <div className="health-icon">♥</div>

                    <h1>Health Triage</h1>

                    <p>
                        AI-powered health assessment
                    </p>
                </div>

                <form onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                </form>

                {message && (
                    <div className="login-message">
                        {message}
                    </div>
                )}

                <p className="register-text">
                    Don't have an account?
                    <span onClick={() => navigate("/register")}>
        Create an account
    </span>
                </p>

            </div>

        </div>
    );
}

export default Login;