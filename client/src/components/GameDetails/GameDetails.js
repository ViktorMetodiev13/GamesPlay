import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { gameServiceFactory } from '../../services/gameService';
import { useService } from "../../hooks/useService";

export const GameDetails = () => {
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const [comment, setComment] = useState('');
    const [username, setUsername] = useState('');
    const gameService = useService(gameServiceFactory);

    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => {
                setGame(result);
            })
            .catch((err) => {
                console.log("Error " + err);
            });
    }, [gameId])

    const onCommentSubmit = async (e) => {
        e.preventDefault();

        const result = await gameService.addComment(gameId, {
            username,
            comment,
        });

        setGame(state => ({ ...state, comments: { ...state.comments, [result._id]: result } }));

        setUsername('');
        setComment('');
    }

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
                        {game.comments && Object.values(game.comments).map(c => (
                            <li key={c._id} className="comment">
                                <p>{c.username}: {c.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {!game.comments && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div>
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onCommentSubmit}>
                    <input type="text" name="username" placeholder="Пешо" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <textarea name="comment" placeholder="Comment......" value={comment} onChange={(e) => setComment(e.target.value)} ></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
}