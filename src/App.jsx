import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        const todos = JSON.parse(todoString);
        setTodos(todos);
      } catch (error) {
        console.error("Failed to parse todos from local storage:", error);
      }
    }
  }, []);

  const updateTodo = (e) => {
    setTodo(e.target.value);
  };

  const addTodos = () => {
    if (todo !== "") {
    
      const updatedTodos = [...todos, { todo }];
      setTodos(updatedTodos);

      // Save the updated array to local storage
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      // Clear the input
      setTodo("");
    }
  };

  const deleteBtn = (index) => {
    const copytodos = [...todos];
    copytodos.splice(index, 1);
    setTodos(copytodos);
    localStorage.setItem("todos", JSON.stringify(copytodos));
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-2xl'>iTask - Manage your todos in one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <div className="flex">
            <input
              onChange={updateTodo}
              value={todo}
              type="text"
              className='w-full rounded-full px-5 py-2 border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500'
              placeholder="Enter your todo..."
            />
            <button
              onClick={addTodos}
              className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'
            >
              Add
            </button>
          </div>
        </div>

        <div className="todos-container flex flex-col space-y-3">
          {todos.map((item, index) => (
            <div key={index} className="todo-item flex justify-between items-center bg-white p-3 rounded-md shadow-md">
              <div className='block'>
                <ul>
                  <li className="text-lg">{item.todo}</li>
                </ul>
              </div>
              <div>
                <button className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
                <button onClick={() => deleteBtn(index)} className='bg-red-500 hover:bg-red-700 p-2 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
