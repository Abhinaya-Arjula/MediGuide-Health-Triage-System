import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TriageForm from "./pages/TriageForm";
import Result from "./pages/Result";
import Hospital from "./pages/Hospital";
import History from "./pages/History";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/triage" element={<TriageForm />} />
                <Route path="/result" element={<Result />} />
                <Route path="/hospital" element={<Hospital />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;