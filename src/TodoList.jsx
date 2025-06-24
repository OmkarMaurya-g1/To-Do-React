import {useState} from "react";
import {v4 as uuidv4} from "uuid";

export default function TodoList() {
  let [todos, setTodos] = useState([
    {task: "sample-task", id: uuidv4(), isDone: false},
  ]);
  let [newTodo, setNewTodo] = useState("");
  let [isUpperCase, setIsUpperCase] = useState(false); // new toggle state
  let [isAllDone, setIsAllDone] = useState(false);

  let addNewTask = () => {
    setTodos((prevTodos) => {
      return [...prevTodos, {task: newTodo, id: uuidv4(), isDone: false}];
    });
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== id));
  };

  //ToggleCase (Updating All Elements in Array)
  let toggleCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          task: isUpperCase ? todo.task.toLowerCase() : todo.task.toUpperCase(),
        };
      })
    );
    setIsUpperCase(!isUpperCase);
  };

  // Updating One Element in Array
  let UpperCaseOne = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            task: todo.task.toUpperCase(),
          };
        } else {
          return todo;
        }
      })
    );
  };

  //For Mark as Done to One element
  // let markAsDone = (id) => {
  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) => {
  //       if (todo.id == id) {
  //         return {
  //           ...todo,
  //           isDone: true,
  //         };
  //       } else {
  //         return todo;
  //       }
  //     })
  //   );
  // };

  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      })
    );
  };

  // // Mark as Done All element
  // let markAlldone = () => {
  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) => {
  //       return {
  //         ...todo,
  //         isDone: true,
  //       };
  //     })
  //   );
  // };

  // Mark All Done And Ummark All
  let markAlldone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          isDone: !isAllDone,
        };
      })
    );
    setIsAllDone(!isAllDone);
  };

  return (
    <div className="todo-container">
      <h1>TO-Do List App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // prevent page refresh
          addNewTask(); // call your function
        }}
      >
        <input
          type="text"
          placeholder="add a task"
          value={newTodo}
          onChange={updateTodoValue}
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <hr />
      <h4>Task To-do</h4>
      <ol className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span className={`todo-task ${todo.isDone ? "task-done" : ""}`}>
              {todo.task}
            </span>
            <div className="todo-actions">
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => UpperCaseOne(todo.id)}>
                UpperCase One
              </button>
              <button onClick={() => markAsDone(todo.id)}>
                {todo.isDone ? "Unmark" : "Mark Done"}
              </button>
            </div>
          </li>
        ))}
      </ol>
      <br></br>
      <button onClick={toggleCaseAll}>
        {isUpperCase ? "LowerCase All" : "UpperCase All"}
      </button>
      <button onClick={markAlldone}>
        {isAllDone ? "Unmark All" : "Mark All as Done"}
      </button>
    </div>
  );
}
