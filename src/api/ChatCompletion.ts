import axios from 'axios';

const instance = axios.create({
    //baseURL: 'https://jenni-manuscript-backend.onrender.com/',
    baseURL: 'http://localhost:8080/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },

    onDownloadProgress: (progressEvent) => {
        const xhr = progressEvent.event.target;
        const responseText = xhr.responseText;
        // Process the received data
        console.log(responseText);
    },
});

export const sendChat = async (message: string) => {
    try {
        const response = await instance.post('/chat', { message });
        return response.data;
    } catch (err) {
        console.error("Error sending chat:", err);
        throw err;
    }
}

export const sendFile = async (formData: FormData) => {
    try {
        const response = await instance.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure the correct content type is set
            },
        });
        return response;
    } catch (err) {
        console.error("Error sending file: ", err);
        throw err;
    }
}

export default instance;