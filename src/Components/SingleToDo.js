import React from "react";
import {
  BsFillCircleFill,
  BsFillXSquareFill,
  BsCheckCircleFill,
} from "react-icons/bs";

import { IconContext } from "react-icons";

const SingleToDo = ({
  isDone,
  text,
  func,
  removeFunc,
  bgStyle,
  eleIndex,
  dragEnterFunc,
  dragStartFunc,
  dropFunc,
  textStyle,
}) => {
  const doneIcon = isDone ? (
    <IconContext.Provider value={{ color: "hsl(280, 87%, 65%)" }}>
      <BsCheckCircleFill onClick={func} style={{ fontSize: "1.5em" }} />
    </IconContext.Provider>
  ) : (
    <IconContext.Provider
      value={{ color: bgStyle, className: "global-class-name" }}
    >
      <BsFillCircleFill
        onClick={func}
        style={{
          border: "1px solid hsl(233, 11%, 84%)",
          borderRadius: "50%",
          fontSize: "1.5em",
        }}
      />
    </IconContext.Provider>
  );
  const doneClass = isDone ? "done" : "notDone";

  return (
    <>
      <li
        className={doneClass}
        onDragStart={(e) => dragStartFunc(e, eleIndex)}
        onDragEnter={(e) => dragEnterFunc(e, eleIndex)}
        onDragEnd={dropFunc}
        draggable
      >
        <div>{doneIcon}</div>
        <p>{text}</p>
        <IconContext.Provider
          value={{ color: textStyle, className: "global-class-name" }}
        >
          <BsFillXSquareFill
            onClick={removeFunc}
            style={{ fill: bgStyle, strokeWidth: "1", fontSize: "1.5em" }}
          />
        </IconContext.Provider>
      </li>
     </>
  );
};

export default SingleToDo;

//   <IconContext.Provider value={{ color: "blue", className: "global-class-name" }}>
//   <div>
//     <FaFolder />
//   </div>
// </IconContext.Provider>
// style={{backgroundImage: "linear-gradient(45deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))", fontSize: "2em" }}
// linear-gradient(45deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))

// import Draggable from 'react-draggable';
// const nodeRef = React.createRef();
/* <li className={doneClass} onDragStart={(e) => dragStart(e, eleIndex)} draggable ref={forwardedRef}> */
/* <Draggable nodeRef={nodeRef}> */

// const dragItem = useRef();
// const dragOverItem = useRef();
// const dragStart = (e, position) => {
//   dragItem.current = position;
//   console.log(e.target.innerHTML);
// };

// const dragEnter = (e, position) => {
//   dragOverItem.current = position;
//   console.log(e.target.innerHTML);
// };

// const drop = (e) => {
//   const copyListItems = [...list];
//   const dragItemContent = copyListItems[dragItem.current];
//   copyListItems.splice(dragItem.current, 1);
//   copyListItems.splice(dragOverItem.current, 0, dragItemContent);
//   dragItem.current = null;
//   dragOverItem.current = null;
//   setList(copyListItems);
// };

/* </Draggable> */
/* {
    list&&
    list.map((item, index) => (
      <li className={doneClass}
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragEnd={drop}
        key={item.id}
        draggable>
          <div>{doneIcon}</div>
          <p>{item.content}</p>
          <BsFillXSquareFill onClick={removeFunc} style={cancelStyle}/>
      </li>
      ))} */
