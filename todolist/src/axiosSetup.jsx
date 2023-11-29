import axios from "axios";

const Axios = axios.create({
 baseURL: "http://127.0.0.1:5174" || "http://localhost:5174" || "https://localhost:5174" || "https://127.0.0.1:5174",
 withCredentials: true,
});

// process.env.REACT_APP_BASE_URL || 

export default Axios;