import React, { useState, useRef } from "react";
import "./Components/Styles.css";
import darkImage from "./Components/Images/bg-desktop-dark.jpg";
import lightImage from "./Components/Images/bg-desktop-light.jpg";
import ToggleIcon from "./Components/ToggleIcon";
import SingleToDo from "./Components/SingleToDo";
import { BsFillCircleFill} from "react-icons/bs";
import Draggable from 'react-draggable';


function App() {
  const [theme, setTheme] = useState("light");
  const generateId = () => Math.floor(Math.random() * 350);
  const [active, setActive] = useState([]);
  const [completed, setCompleted] = useState([]);
  const ref = React.createRef();
  const dragItem = useRef();
  const dragOverItem = useRef();
  //   const Todos = [
  //     {
  //       id: generateId(),
  //       content : "hey therre boo"
  //     }
  // ]
  const [todos, setTodos] = useState([]);
  const bgColor = theme === "dark" ? "hsl(237, 14%, 26%)" : " hsl(0, 0%, 98%)";
  const textColor = theme === "dark" ? "hsl(234, 39%, 85%)" : "hsl(235, 19%, 35%)"
  const backGround = theme === "dark" ? darkImage : lightImage;
  const style = {
    color: bgColor,
    fontSize: "1.8em",
    border: "1px solid hsl(233, 11%, 84%)",
    borderRadius: "50%",
  };
  const nodeRef = React.useRef(null);


  const toggleTheme = () => {
    const light = "light";
    const dark = "dark";
    const Theme = theme === light ? dark : light;
    setTheme(Theme);
  };

  const addTodos = () => {
    const val = ref.current.value;
    if(!val){
      alert('Please, fill to create a todo')
      return
    }

    const newTodo = {
      id: generateId(),
      content: val,
      isDone: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    ref.current.value = '';
  };
  const removeTodo = (ID) => {
    const items = [...todos];
    let index;
    items.forEach((ele, i) => {
      if (ele.id === ID) index = i;
    });
    items.splice(index, 1);
    setTodos(items);
  };
  const toggleDone = (val, ID) => {
    const value = !val ? true : false;
    const items = [...todos];
    items.forEach((ele) => {
      if (ele.id === ID) ele.isDone = value;
    });
    setTodos(items);
  };
  const filterByActive = () => {
    const items = [...todos];
    //console.log(items);
    const activeTodos = items.filter((ele) => !ele.isDone);
   // console.log(activeTodos);
    setActive(activeTodos);
  };

  const filterByCompleted = () => {
    const items = [...todos];
    console.log(items);
    const completedTodos = items.filter((ele) => ele.isDone);
    console.log(completedTodos);
    setCompleted(completedTodos);
  };
  // const alternateDisplay = active.length === 0 ? completed : active;
  // const display = alternateDisplay || todos 
    // active.length > 0 ? active : completed.length > 0 ? completed : todos;
    const display = active.length > 0 ? active : completed.length > 0 ? completed : todos;
    const noFilter = () =>{
      console.log(todos)
      const items = [...todos];
      console.log(items)
      // items.forEach(ele =>{
      //   console.log(ele.isDone)
      //   ele.isDone = false
      // })
      setTodos(items)
    }
    const clearCompleted = () =>{
        const items = [...todos];
        const completedItems = items.filter(ele => !ele.isDone)
      setTodos(completedItems)
    }
  
    const dragStart = (e, position) => {
      dragItem.current = position;
      // console.log(e.target.innerHTML);
    };
   
    const dragEnter = (e, position) => {
      dragOverItem.current = position;
      // console.log(e.target.innerHTML);
    };
   
    const drop = (e) => {
      const copyListItems = [...todos];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setTodos(copyListItems);
    };
    
  return (
    <div style={{ backgroundColor: bgColor, height: "100vh", color: textColor}}>
      {/* <style>{"body {background-color: '+bgColor+';}"}</style> */}
      <div className="top" style={{ backgroundImage: `url(${backGround})` }}>
        <div className="top_inner">
          <h1>TODO</h1>
          <ToggleIcon currentTheme={theme} func={toggleTheme} />
        </div>
      </div>

      {/* <section className="main_section"> */}
      <Draggable nodeRef={nodeRef}>
        {/* <div style={{width: "50%", margin: "1% auto"}}> */}
        <div className="main_content" ref={nodeRef}>
        <div className="add_todo" style={{ backgroundColor: bgColor }}>
          <BsFillCircleFill onClick={addTodos} style={style} />
          <input
            type="text"
            ref={ref}
            style={{ backgroundColor: bgColor, color: textColor }}
            placeholder={"Create a new todo..."}
          />
          {/* <button onClick={addTodos}>Submit</button> */}
        </div>
       <div style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", width: "auto", borderRadius: "6px"}}>
       <ul style={{ backgroundColor: bgColor }}>
          {display.map((ele, index) => (
            <SingleToDo
              text={ele.content}
              key={ele.id}
              isDone={ele.isDone}
              func={() => toggleDone(ele.isDone, ele.id)}
              removeFunc={() => removeTodo(ele.id)}
              // style={{  }}
              bgStyle ={bgColor} 
              eleIndex={index}
              dragEnterFunc={dragEnter}
              dragStartFunc={dragStart}
              dropFunc={drop}
              textStyle={textColor}
            
            />
            
          ))}
        </ul>
       
        {todos.length !== 0 && <div className="controls" style={{ backgroundColor: bgColor }}>
          <p>{active.length} items left</p>
          <div className="buttons">
            <button onClick={noFilter}>All</button>
            <button onClick={filterByActive}>Active</button>
            <button onClick={filterByCompleted}>Completed</button>
          </div>
          <button onClick={clearCompleted}>Clear Completed</button>
        </div>}
       </div>
        <h6>Drag and Drop to reorder list</h6>
      </div>
        {/* </div> */}
      
       </Draggable>
      {/* </section> */}

      {/* <SingleToDo isDone={done} func={() => setDone(!done)} /> */}
    </div>
  );
}

export default App;

// const backGround = theme === "dark" ? 'darkBG' : 'lightBG'
// className={backGround}
