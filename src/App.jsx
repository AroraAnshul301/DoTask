import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./Components/Navbar";

function App() {
  const [todo, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [showFinished, setShowFinished] = useState(false)
  const [newTask, setNewTask] = useState("");
  let inpRef = useRef();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const handleAdd = () => {
    if (!newTask.trim()) {
      alert("Please enter a valid task!");
      return;
    }
    setTodo((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), todo: newTask, isCompleted: false },
    ]);
    setNewTask("");
    inpRef.current.focus();
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleCheck = (id) => {
    setTodo((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTodo((prevTodos) => prevTodos.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = todo.find((item) => item.id === id);
    if (taskToEdit) {
      setNewTask(taskToEdit.todo);
      inpRef.current.focus();
      setTodo((prevTodos) => prevTodos.filter((item) => item.id !== id));
    }
  };

  const toggle=(e) => {
    setShowFinished(!showFinished)
  }
  

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto my-12 p-6 bg-blue-50 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Todo List
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            placeholder="Enter a new task..."
            ref={inpRef}
            value={newTask}
            onChange={handleChange}
            type="text"
            className="w-full md:w-2/3 p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Add Task
          </button>
        </div>
        <input onChange={toggle} type="checkbox" name="" id="" checked={showFinished} className="my-4"/> Show Finished
        <div className="mt-6">
          {todo.length === 0 ? (
            <p className="text-center text-gray-500">No tasks to display</p>
          ) : (
            <div className="space-y-4">
              {todo.map((item) => {
                return (showFinished||!item.isCompleted) && <div
                  key={item.id}
                  className="flex flex-wrap justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={() => handleCheck(item.id)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span
                      className={`text-lg  break-words whitespace-normal overflow-hidden w-full  ${item.isCompleted ? "line-through text-gray-400" : ""
                        }`}
                    >
                      {item.todo}
                    </span>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
})}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
