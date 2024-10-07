import { CONFIG_SSO } from "@constants";
import axios from "axios";

const API_URL = `${CONFIG_SSO.BASE.HOME}/api/rooms`;

export const createRoom = async (roomData: FormData) => {
    try {
        const response = await axios.post(API_URL, roomData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for sending FormData
            },
        });
        return response.data; // Assuming the response contains success status and other data
    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to create room');
    }
};
