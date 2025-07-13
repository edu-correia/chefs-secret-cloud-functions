import axios from "axios";

const createAPIBaseConfig = (apiKey: string) => {
    const api = axios.create({
        baseURL: "https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/",
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com'
        }
    });

    return api;
}

export {
    createAPIBaseConfig
};