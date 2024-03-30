import * as request from "./requester";

const baseUrl = 'http://localhost:3030/jsonstore/games';

export const getAll = async () => {
    const games = await request.get(baseUrl);

    return Object.values(games);
};