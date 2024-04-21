import { Link } from "react-router-dom"

export const LastestGameItem = ({
    _id,
    title,
    imageUrl
}) => {
    return (
        <div className="game">
            <div className="image-wrap">
                <img src={imageUrl} alt={title} />
            </div>
            <h3>{title}</h3>
            <div className="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div className="data-buttons">
                <Link to={`/catalog/${_id}`} className="btn details-btn">Details</Link>
            </div>
        </div>
    )
}