import React, { useContext } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

const Favourites = (props) => {
  const { id, image, title, removeFromFavorites } = props;

  const { theme } = useContext(ThemeContext);

  return (
    <div className="favorite-item" key={id}>
      <div>
        <img src={image} alt="image1" />
      </div>
      <p style={theme ? { color: "#12343b" } : {}}>{title}</p>
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        className="recipiesBtn"
        onClick={removeFromFavorites}
      >
        Remove from favourites
      </button>
    </div>
  );
};

export default Favourites;
