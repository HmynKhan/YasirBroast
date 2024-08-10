import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import "./styles.css";
import Search from "../../components/search";
import Recipies from "../../components/recipiesItem";
import Favourites from "../../components/favoritesItem";
import { ThemeContext } from "../../App";

const Homepage = () => {
  const initialState = {
    filteredVal: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "filterFavorites":
        return {
          ...state,
          filteredVal: action.value,
        };

      default:
        return state;
    }
  };
  // loading state
  const [loadingState, setLoadingState] = useState(false);

  // favourite recipies state
  const [favourties, setFavourties] = useState([]);

  // save results that we recieve from api
  const [recipies, setRecepies] = useState([]);

  // set api call success or not?
  const [apicallSucess, setapicallSucess] = useState(false);

  const [filterState, dispatch] = useReducer(reducer, initialState);

  const { theme } = useContext(ThemeContext);

  const getDatafromSearchComp = (getData) => {
    //keep the loading state true before calling api
    setLoadingState(true);
    // console.log(getData, "getData");

    // calling the api
    async function getReciepies() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=6ecd9d214eda406da619d15a1c7fdc73&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;
      //   console.log(results);
      if (results && results.length > 0) {
        // set loading state as false again
        // set the recipies state
        setLoadingState(false);
        setRecepies(results);
        setapicallSucess(true);
      }
    }
    getReciepies();
  };

  const addToFavourites = useCallback(
    (getCurrentrecipieItem) => {
      let copyFav = [...favourties];
      const index = copyFav.findIndex(
        (item) => item.id === getCurrentrecipieItem.id
      );
      // console.log(index);
      if (index === -1) {
        copyFav.push(getCurrentrecipieItem);
        setFavourties(copyFav);
        // save favourites in local storage
        localStorage.setItem("favorites", JSON.stringify(copyFav));
        window.scrollTo({ top: "0", behavior: "smooth" });
      } else {
        alert(`${getCurrentrecipieItem.title} is already present in favorites`);
      }
    },
    [favourties]
  );

  // console.log(favourties);

  const removeFromFavorites = (getid) => {
    // console.log("removeFromFavorites id : ", getid);
    const newFav = favourties.filter((fav) => fav.id !== getid);
    setFavourties(newFav);
    localStorage.setItem("favorites", JSON.stringify(newFav));
  };

  useEffect(() => {
    const getFavoritesFromLocalStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavourties(getFavoritesFromLocalStorage);
  }, []);

  // console.log("filterState : ", filterState);

  // filter the favorites
  const filterFavorites =
    favourties && favourties.length > 0
      ? favourties.filter((item) =>
          item.title.toLowerCase().includes(filterState.filteredVal)
        )
      : [];

  const rednerRcipies = useCallback(() => {
    if (recipies && recipies.length > 0) {
      return recipies.map((item, index) => (
        <Recipies
          addToFavourites={() => addToFavourites(item)}
          id={item.id}
          image={item.image}
          title={item.title}
          key={index}
        />
      ));
    }
  }, [recipies, addToFavourites]);

  return (
    <div className="homepage">
      <Search
        getDatafromSearchComp={getDatafromSearchComp}
        apicallSucess={apicallSucess}
        setapicallSucess={setapicallSucess}
      />

      {/* show favorites items */}

      <h1 style={theme ? { color: "#12343b" } : {}} className="favorite-title">
        FAVOURITE'S
      </h1>

      <div className="search-favorites">
        <input
          type="text"
          className="searchFavorite"
          placeholder="Search favorite's"
          onChange={(e) =>
            dispatch({ type: "filterFavorites", value: e.target.value })
          }
          value={filterState.filteredVal}
        />
      </div>

      <div className="favorite-wrapper">
        <div className="favorites">
          {!filterFavorites.length && (
            <div
              className="no-favorites"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              No favorites are found
            </div>
          )}
          {filterFavorites && filterFavorites.length > 0
            ? filterFavorites.map((item, index) => {
                return (
                  <Favourites
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    key={index}
                    removeFromFavorites={() => removeFromFavorites(item.id)}
                  />
                );
              })
            : null}
        </div>
      </div>

      {/* show favorites items */}

      {/* loading state show */}
      {loadingState && (
        <h5 className="loading">Loading recipies! please wait</h5>
      )}

      {/* map through all the recipies */}

      <div className="items">
        {/* {rednerRcipies()} */}
        {useMemo(
          () =>
            !loadingState && recipies && recipies.length > 0
              ? recipies.map((item, index) => (
                  <Recipies
                    addToFavourites={() => addToFavourites(item)}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    key={index}
                  />
                ))
              : null,
          [loadingState, recipies, addToFavourites]
        )}

        {!loadingState && !recipies.length && (
          <div className="no-items">No recipie's are found</div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
