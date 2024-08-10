import React, { useContext } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

const Theme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  console.log("theme : ", theme, setTheme);
  return (
    <button
      className="themeBtn"
      style={theme ? { backgroundColor: "#12343b" } : {}}
      onClick={() => setTheme(!theme)}
    >
      Change Theme
    </button>
  );
};

export default Theme;
