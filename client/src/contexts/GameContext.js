import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { gameServiceFactory } from "../services/gameService";

export const GameContext = createContext();

export const GameProvider = ({
    children
}) => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const gameService = gameServiceFactory();

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            })
            .catch((err) => {
                console.log("Error " + err);
            });
    }, []);

    const onCreateGameSubmit = async (data) => {
        const newGame = await gameService.createGame(data);

        setGames(state => ([...state, newGame]));

        navigate('/catalog');
    };

    const onGameEditSubmit = async (values) => {
        const gameId = values._id;
        const result = await gameService.edit(gameId, values);

        setGames(state => state.map(g => g._id === values._id ? result : g));

        navigate(`/catalog/${gameId}`);
    };

    const deleteGame = async (gameId) => {
        setGames(state => state.filter(game => game._id !== gameId));
    };

    const getGame = (gameId) => {
        return games.find(game => game._id === gameId);
    };

    const contextValues = {
        games,
        deleteGame,
        onCreateGameSubmit,
        onGameEditSubmit,
        getGame,
    };

    return (
        <GameContext.Provider value={contextValues}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);

    return context;
};