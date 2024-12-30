import axios from "axios";
import { backendUrl } from "../constants";

export const registerUser = async (data) => {
    try {
        const res = await axios.post(backendUrl + "/users/register", data, { withCredentials: true });
        return res;
    } catch (error) {
        return error;
    }
}

export const loginUser = async (data) => {
    try {
        const res = await axios.post(backendUrl + "/users/login", data, { withCredentials: true });
        return res;
    } catch (error) {
        return error;
    }
}

export const checkAuth = async () => {
    try {
        const res = await axios.get(backendUrl + "/users/check-auth", { withCredentials: true });
        return res;
    } catch (error) {
        return error;
    }
}

export const logoutUser = async () => {
    try {
        const res = await axios.post(backendUrl + "/users/logout", {}, { withCredentials: true });
        return res;
    } catch (error) {
        return error;
    }
}

export const resendToken = async (email) => {
    try {
        const res = await axios.post(backendUrl + "/users/resend-token", { email }, { withCredentials: true });
        return res;
    } catch (error) {
        return error;
    }
}

export const changeUsername = async (username) => {
    try {
        const res = await axios.patch(backendUrl + "/users/change-username", { username }, { withCredentials: true });
        return res;
    } catch (error) {
        return error;
    }
}

export const changeAvatar = async (avatar) => {
    try {
        const res = await axios.patch(backendUrl + "/users/change-avatar", avatar, { withCredentials: true });
        return res;
    } catch (error) {
        return error;
    }
}