import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

const Search = (props) => {
  const [inputVal, setInputVal] = useState("");

  const { getDatafromSearchComp, apicallSucess, setapicallSucess } = props;

  const { theme } = useContext(ThemeContext);

  const handleInput = (e) => {
    const { value } = e.target;
    setInputVal(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal !== "") {
      getDatafromSearchComp(inputVal);
      setInputVal("");
    } else {
      alert("Searchbar is empty please enter recipie to find!");
    }
  };

  useEffect(() => {
    if (apicallSucess) {
      setInputVal("");
      setapicallSucess(false);
    }
  }, [apicallSucess, setapicallSucess]);

  console.log(apicallSucess);
  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        id="search"
        value={inputVal}
        onChange={(e) => handleInput(e)}
        placeholder="what you want to eat ?"
      />
      <button style={theme ? { backgroundColor: "#12343b" } : {}}>
        search
      </button>
    </form>
  );
};

export default Search;
