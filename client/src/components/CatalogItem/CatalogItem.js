export const CatalogItem = ({
    img,
    genre,
    title
}) => {
    return (
        <div className="allGames">
                <div className="allGames-info">
                    <img src={img} />
                    <h6>{genre}</h6>
                    <h2>{title}</h2>
                    <a href="#" className="details-button">Details</a>
                </div>
            </div>
    );
}