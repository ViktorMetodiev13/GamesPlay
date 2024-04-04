import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, redirect } from "react-router-dom";

import * as gameService from "./services/gameService";
import * as authService from "./services/authService";
import { AuthContext } from "./contexts/AuthContext";

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { Catalog } from "./components/Catalog/Catalog";
import { GameDetails } from "./components/GameDetails/GameDetails";


function App() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        gameService.getAll()
            .then(setGames)
            .catch((err) => {
                console.log("Error " + err);
            });
    }, []);

    const onCreateGameSubmit = async (data) => {
        const newGame = await gameService.createGame(data);

        setGames(state => ([...state, newGame]));

        navigate('/catalog');
    };

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);
            
            navigate("/catalog");
        } catch (error) {
            console.log('There is a problem');
        }

    };

    return (
        <AuthContext.Provider value={{ onLoginSubmit }}>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/create-game" element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} />} />
                        <Route path="/catalog" element={<Catalog games={games} />} />
                        <Route path="/catalog/:gameId" element={<GameDetails />} />
                    </Routes>
                </main>

            </div>
        </AuthContext.Provider>
    );
}

export default App;
