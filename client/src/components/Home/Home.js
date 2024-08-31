import "./welcome.css";

import { useEffect, useState } from "react";

import { LastestGameItem } from "./LastestGameItem/LastestGameItem";

import hero from './images/four_slider_img01.png';

export const Home = () => {
    const [lastestGames, setLastestGames] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/data/games')
            .then(res => res.json())
            .then(result => {
<<<<<<< HEAD
                setLastestGames(result.slice(-3).reverse());
=======
                setLastestGames(result.slice(-3));
>>>>>>> 0710888a5288ff35d322dacaf703d194658acdcc
            })
    }, [])
    
    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src={hero} alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>

                {lastestGames.length > 0 && lastestGames.map(game =>
                    <LastestGameItem key={game._id} {...game} />
                )}

                {lastestGames.length === 0 && (
                    <p className="no-articles">No games yet</p>
                )}
            </div>
        </section>
    );
}
