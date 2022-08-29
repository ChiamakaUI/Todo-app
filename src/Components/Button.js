import React from "react";

const Buttons = ({ items, func }) => {
  return (
    <div className="buttons">
      {items.map((item, index) => (
        <button onClick={() => func(item)} key={index}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
