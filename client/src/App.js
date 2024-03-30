import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { Catalog } from "./components/Catalog/Catalog";

function App() {
    return (
        <div id="box">
            <Header />

            <main id="main-content">
                <Catalog />
            </main>

        </div>
    );
}

export default App;
