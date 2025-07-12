import axios from "axios";

const api = axios.create({
    baseURL: "https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/",
    headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY || "",
        'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com'
    }
});

export {
    api
};