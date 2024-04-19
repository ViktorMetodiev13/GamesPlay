import { useEffect, useReducer } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { gameServiceFactory } from '../../services/gameService';
import * as commentService from "../../services/commentService";
import { useService } from "../../hooks/useService";
import { useAuthContext } from "../../contexts/AuthContext";
import { gameReducer } from "../../reducers/gameReducer";

import { AddComment } from "./AddComment/AddComment";
import { useGameContext } from "../../contexts/GameContext";

export const GameDetails = () => {
    const { gameId } = useParams();
    const { deleteGame } = useGameContext();
    const { userId, isAuthenticated, userEmail } = useAuthContext();
    const [game, dispatch] = useReducer(gameReducer, {});
    const gameService = useService(gameServiceFactory);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            gameService.getOne(gameId),
            commentService.getAll(gameId),
        ])
            .then(([gameData, comments]) => {
                const gameState = {
                    ...gameData,
                    comments
                };

                dispatch({ type: 'GAME_FETCH', payload: gameState });
            });
    }, [gameId]);

    const onCommentSubmit = async (values) => {
        const response = await commentService.create(gameId, values.comment);

        dispatch({
            type: 'COMMENT_ADD',
            payload: response,
            email: userEmail,
        });
    };

    const isOwner = game._ownerId === userId;

    const onDeleteGame = async () => {
        const result = window.confirm(`Are you sure you want to delete ${game.title}`);

        if (result) {
            await gameService.delete(gameId);

            deleteGame(game._id);
            
            navigate('/catalog');
        };
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt={`${game.title} image`} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments && game.comments.map(c => (
                            <li key={c._id} className="comment">
                                <p>{c.author.email}: {c.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {!game.comments?.length && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalog/${game._id}/edit`} className="button">Edit</Link>
                        <button className="button" onClick={onDeleteGame}>Delete</button>
                    </div>
                )}
            </div>

            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}

        </section>
    );
}