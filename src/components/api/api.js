import axios from "axios";

export default axios.create({
    baseURL : import.meta.env.VITE_SHRINKLY_BACKEND_URL
});