import * as request from "./requester";

const baseUrl = 'http://localhost:3030/users';

export const login = (data) => {
    return request.post(`${baseUrl}/login`, data);
};

export const register = (data) => {
    return request.post(`${baseUrl}/register`, data);
};