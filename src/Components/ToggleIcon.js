import React from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const ToggleIcon = ({ currentTheme, func }) => {
  const style = { color: "white", fontSize: "1.5em" };
  const displayIcon =
    currentTheme === "dark" ? (
      <BsSunFill style={style} onClick={func} />
    ) : (
      <BsMoonFill style={style} onClick={func} />
    );
  return (
    <>
      {displayIcon}
    </>
  );
};

export default ToggleIcon;
 /* <button onClick={func} style={{backgroundColor: "hsl(280, 87%, 65%)", opacity: "0.7"}}>{displayIcon}</button> */