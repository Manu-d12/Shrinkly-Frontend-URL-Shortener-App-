import axios from "axios";

export default axios.create({
    baseURL : import.meta.env.SHRINKLY_BACKEND_URL
});