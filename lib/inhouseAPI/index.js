import axios from "axios";

const inhouseApi = axios.create({
    baseURL: process.env.NEXTAUTH_API,
    headers: {
        "x-api-key": process.env.NEXTAUTH_X_API_KEY,
    },
});

export default inhouseApi;