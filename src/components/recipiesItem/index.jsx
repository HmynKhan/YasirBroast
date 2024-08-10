import React, { useContext } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

const Recipies = (props) => {
  const { id, image, title, addToFavourites } = props;
  const { theme } = useContext(ThemeContext);

  const handleAddToFav = () => {
    addToFavourites();
  };

  return (
    <div className="recipies-item" key={id}>
      <div>
        <img src={image} alt="image1" />
      </div>
      <p style={theme ? { color: "#12343b" } : {}}>{title}</p>
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        onClick={handleAddToFav}
        className="recipiesBtn"
      >
        Add to favourites
      </button>
    </div>
  );
};

export default Recipies;
