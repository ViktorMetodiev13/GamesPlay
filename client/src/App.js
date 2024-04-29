import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';

import { Header } from "./components/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { Register } from "./components/Register/Register";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { Catalog } from "./components/Catalog/Catalog";
import { GameDetails } from './components/GameDetails/GameDetails';
import { EditGame } from './components/EditGame/EditGame';
import { RouteGuard } from './components/Common/RouteGuard';
import { GameOwner } from './components/Common/GameOwner';

function App() {
    return (
        <AuthProvider>
            <GameProvider>
                <div id="box">
                    <Header />

                    <main id="main-content">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/catalog' element={<Catalog />} />
                            <Route path='/catalog/:gameId' element={<GameDetails />} />

                            <Route element={<RouteGuard />}>
                                <Route path='/catalog/:gameId/edit' element={
                                    <GameOwner>
                                        <EditGame />
                                    </GameOwner>
                                } />
                                <Route path='/create-game' element={<CreateGame />} />
                                <Route path='/logout' element={<Logout />} />
                            </Route>
                        </Routes>
                    </main>

                </div>
            </GameProvider>
        </AuthProvider>
    );
}

export default App;
