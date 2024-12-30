import axios from "axios";
import { backendUrl } from "../constants";

export const getAllSideBarUsers = async () => {
    try {
        const res = await axios.get(backendUrl + "/messages/users", { withCredentials: true });
        return res;
    } catch (error) {
        return error;
    }
}

export const getMessages = async (messageUserId) => {
    try {
        const res = await axios.get(backendUrl + "/messages/" + messageUserId, { withCredentials: true });
        return res;
    } catch (error) {
        return error;
    }
}

export const sendMessage = async (messageUserId, data) => {
    try {
        const res = await axios.post(backendUrl + "/messages/send/" + messageUserId, data, { withCredentials: true });
        return res;
    } catch (error) {
        return error;
    }
}