import React from "react";
import {
  BsFillCircleFill,
  BsFillXSquareFill,
  BsCheckCircleFill,
} from "react-icons/bs";


const SingleToDo = ({ isDone, text, func, removeFunc, cancelStyle, eleIndex, dragEnterFunc, dragStartFunc, dropFunc, } ) => {
   // const style = { color: "white", fontSize: "1.5em" };
  const style = { fontSize: "2em" };
  const doneIcon = isDone ? (
    <BsCheckCircleFill onClick={func} style={style} />
  ) : (
    <BsFillCircleFill onClick={func} style={style} />
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
        <BsFillXSquareFill onClick={removeFunc} style={cancelStyle} />
      </li>
      <hr style={{ borderTop: "1px solid hsl(233, 11%, 84%)" }} />
  
    </>
  );
};

export default SingleToDo;

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