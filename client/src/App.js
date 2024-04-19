import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext';
import { gameServiceFactory } from "./services/gameService";

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { Catalog } from "./components/Catalog/Catalog";
import { GameDetails } from "./components/GameDetails/GameDetails";
import { Logout } from "./components/Logout/Logout";
import { EditGame } from "./components/EditGame/EditGame";
import { RouteGuard } from "./components/common/RouteGuard";


function App() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const gameService = gameServiceFactory(); //auth.accessToken

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

    const onGameEditSubmit = async (values) => {
        const gameId = values._id;
        const result = await gameService.edit(gameId, values);

        setGames(state => state.map(g => g._id === values._id ? result : g));

        navigate(`/catalog/${gameId}`);
    };

    return (
        <AuthProvider>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/catalog" element={<Catalog games={games} />} />
                        <Route path="/catalog/:gameId" element={<GameDetails />} />

                        <Route element={<RouteGuard />}>
                            <Route path="/catalog/:gameId/edit" element={<EditGame onGameEditSubmit={onGameEditSubmit} />} />
                            <Route path="/create-game" element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} />} />
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                    </Routes>
                </main>

            </div>
        </AuthProvider>
    );
}

export default App;
