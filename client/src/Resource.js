function App() {
    return (
        <div id="box">
            {/* <!--Home Page--> */}


            {/* <!-- Login Page ( Only for Guest users ) --> */}


            {/* <!-- Register Page ( Only for Guest users ) --> */}


            {/* <!-- Create Page ( Only for logged-in users ) --> */}


            {/* <!-- Edit Page ( Only for the creator )--> */}
            <section id="edit-page" className="auth">
                <form id="edit">
                    <div className="container">

                        <h1>Edit Game</h1>
                        <label htmlFor="leg-title">Legendary title:</label>
                        <input type="text" id="title" name="title" defaultValue="" />

                        <label htmlFor="category">Category:</label>
                        <input type="text" id="category" name="category" defaultValue="" />

                        <label htmlFor="levels">MaxLevel:</label>
                        <input type="number" id="maxLevel" name="maxLevel" min="1" defaultValue="" />

                        <label htmlFor="game-img">Image:</label>
                        <input type="text" id="imageUrl" name="imageUrl" defaultValue="" />

                        <label htmlFor="summary">Summary:</label>
                        <textarea name="summary" id="summary"></textarea>
                        <input className="btn submit" type="submit" value="Edit Game" />

                    </div>
                </form>
            </section>

            {/* <!--Details Page--> */}
            

            {/* <!-- Catalogue --> */}
            
        </div>
    );
}

export default App;
