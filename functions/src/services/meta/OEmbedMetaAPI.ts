import axios from "axios";

const createAPIBaseConfig = () => {
    const api = axios.create({
        baseURL: "https://graph.facebook.com/v19.0",
    });

    return api;
}

export {
    createAPIBaseConfig
};