import axios from "axios";

const api = axios.create({
    baseURL: "https://mediguide-health-triage-system-rtgw.onrender.com"
});

export default api;