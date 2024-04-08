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

    const edit = async (gameId, data) => {
        await request.put(`${baseUrl}/${gameId}`, data);
    };

    const deleteGame = async (gameId) => {
        await request.delete(`${baseUrl}/${gameId}`);
    };

    return {
        getAll,
        getOne,
        createGame,
        edit,
        delete: deleteGame,
        addComment
    };
}