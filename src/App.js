import React, { useState, useRef, useEffect } from "react";
import "./Components/Styles.css";
import darkImage from "./Components/Images/bg-desktop-dark.jpg";
import lightImage from "./Components/Images/bg-desktop-light.jpg";
import ToggleIcon from "./Components/ToggleIcon";
import SingleToDo from "./Components/SingleToDo";
import { BsFillCircleFill } from "react-icons/bs";
import Draggable from "react-draggable";
import Buttons from "./Components/Button";
import uuid from "react-uuid";

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const ref = React.createRef();
  const dragItem = useRef();
  const dragOverItem = useRef();
  const filterBy = ["all", "active", "completed"];

  const [todos, setTodos] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("todos");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [todoList, setTodoList] = useState([]);
  const bgColor = theme === "dark" ? "hsl(237, 14%, 26%)" : " hsl(0, 0%, 98%)";
  const textColor =
    theme === "dark" ? "hsl(234, 39%, 85%)" : "hsl(235, 19%, 35%)";
  const backGround = theme === "dark" ? darkImage : lightImage;
  const style = {
    color: bgColor,
    fontSize: "1.8em",
    border: "1px solid hsl(233, 11%, 84%)",
    borderRadius: "50%",
  };
  const nodeRef = React.useRef(null);
  useEffect(() => {
    // storing input name
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("theme", JSON.stringify(theme));
    setTodoList(todos);
    // Set body background Color
    document.body.style.backgroundColor = bgColor;
  }, [todos, theme, bgColor]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addTodos();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  const toggleTheme = () => {
    const light = "light";
    const dark = "dark";
    const Theme = theme === light ? dark : light;
    setTheme(Theme);
  };

  const addTodos = () => {
    const val = ref.current.value;
    if (!val) {
      alert("Please, fill to create a todo");
      return;
    }

    const newTodo = {
      id: uuid(),
      content: val,
      isDone: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    ref.current.value = "";
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

  const clearCompleted = () => {
    const items = [...todos];
    const completedItems = items.filter((ele) => !ele.isDone);
    setTodos(completedItems);
  };

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
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

  const remainingTodo = todos.filter((ele) => !ele.isDone);

  //FILTER TODOS
  const filterTodos = (status) => {
    const items = [...todos];
    if (status === "all") {
      setTodoList(items);
    }
    if (status === "active") {
      setTodoList(items.filter((ele) => !ele.isDone));
    }
    if (status === "completed") {
      setTodoList(items.filter((ele) => ele.isDone));
    }
  };

  return (
    <div style={{ color: textColor }}>
      <div className="top" style={{ backgroundImage: `url(${backGround})` }}>
        <div className="top_inner">
          <h1>TODO</h1>
          <ToggleIcon currentTheme={theme} func={toggleTheme} />
        </div>
      </div>

      <Draggable nodeRef={nodeRef}>
        <div className="main_content" ref={nodeRef}>
          <div className="add_todo" style={{ backgroundColor: bgColor }}>
            <BsFillCircleFill onClick={addTodos} style={style} />
            <input
              type="text"
              ref={ref}
              style={{ backgroundColor: bgColor, color: textColor }}
              placeholder={"Create a new todo..."}
            />
          </div>
          <div
            style={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              width: "auto",
              borderRadius: "6px",
            }}
          >
            <ul style={{ backgroundColor: bgColor }}>
              {todoList.map((ele, index) => (
                <SingleToDo
                  text={ele.content}
                  key={ele.id}
                  isDone={ele.isDone}
                  func={() => toggleDone(ele.isDone, ele.id)}
                  removeFunc={() => removeTodo(ele.id)}
                  bgStyle={bgColor}
                  eleIndex={index}
                  dragEnterFunc={dragEnter}
                  dragStartFunc={dragStart}
                  dropFunc={drop}
                  textStyle={textColor}
                />
              ))}
            </ul>

            {todos.length !== 0 && (
              <div className="controls" style={{ backgroundColor: bgColor }}>
                <p>{remainingTodo.length} items left</p>
                <Buttons items={filterBy} func={filterTodos} />
                <button onClick={clearCompleted}>Clear Completed</button>
              </div>
            )}
          </div>
          <h6>Drag and Drop to reorder list</h6>
        </div>
      </Draggable>
    </div>
  );
}

export default App;
