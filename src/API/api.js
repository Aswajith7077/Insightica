import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_BASE_DEV_SERVER_URL });
export{
    api,
}
