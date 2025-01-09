import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jenni-manuscript-backend.onrender.com/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
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

export default instance;