import * as request from "./requester";

const baseUrl = 'http://localhost:3030/jsonstore/games';

export const getAll = async () => {
    const games = await request.get(baseUrl);

    return Object.values(games);
};

export const getOne = async (gameId) => {
    const result = await request.get(`${baseUrl}/${gameId}`);

    return result;
};

export const createGame = async (data) => {
    const result = await request.post(baseUrl, data);

    return result;
};