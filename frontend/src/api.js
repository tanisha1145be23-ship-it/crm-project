import axios from "axios";

const API = axios.create({
  baseURL: "https://crm-backend-4v8v.onrender.com/api",
});

export default API;