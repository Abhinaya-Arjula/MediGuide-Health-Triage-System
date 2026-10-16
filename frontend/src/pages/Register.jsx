import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";
function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            await api.post("/auth/register", {
                name: name,
                email: email,
                password: password
            });

            setMessage("Registration successful! You can now login.");

            setName("");
            setEmail("");
            setPassword("");

        } catch (error) {

            if (error.response) {
                setMessage(
                    error.response.data?.message ||
                    "Registration failed. Please try again."
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

                    <div className="health-icon">
                        ♥
                    </div>

                    <h1>Create Account</h1>

                    <p>
                        Join Health Triage
                    </p>

                </div>

                <form onSubmit={handleRegister}>

                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                    </div>

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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>

                </form>

                {message && (
                    <div className="login-message">
                        {message}
                    </div>
                )}
                <p className="register-text">
                    Already have an account?
                    <span onClick={() => navigate("/")}>
        Back to Login
    </span>
                </p>

            </div>

        </div>
    );
}

export default Register;