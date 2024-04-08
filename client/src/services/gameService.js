import { requestFactory } from "./requester";

const baseUrl = 'http://localhost:3030/data/games';


export const gameServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const games = await request.get(baseUrl);

        return Object.values(games);
    };

    const getOne = async (gameId) => {
        const result = await request.get(`${baseUrl}/${gameId}`);

        return result;
    };

    const createGame = async (data) => {
        const result = await request.post(baseUrl, data);

        return result;
    };

    const addComment = async (gameId, data) => {
        const result = await request.post(`${baseUrl}/${gameId}/comments`, data);

        return result;
    };

    return {
        getAll,
        getOne,
        createGame,
        addComment
    };
}