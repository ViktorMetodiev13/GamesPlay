import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { Catalog } from "./components/Catalog/Catalog";

import * as gameService from "./services/gameService";

function App() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll()
            .then(setGames)
            .catch((err) => {
                console.log("Error " + err);
            });
    }, []);

    return (
        <div id="box">
            <Header />

            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create-game" element={<CreateGame />} />
                    <Route path="/catalog" element={<Catalog games={games}/>} />
                </Routes>
            </main>

        </div>
    );
}

export default App;
