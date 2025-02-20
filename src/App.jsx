import { useState } from "./hooks/useState";
import { getItem, setItem } from "./util/storage";
import { TODOS } from "./util/const";

const loadTodosFromStorage = () => {
  const savedTodos = getItem(TODOS);
  return savedTodos ? savedTodos : [];
};

const saveTodosToStorage = (todos) => {
  setItem(TODOS, todos);
};

function App() {
  const [todos, setTodos] = useState(loadTodosFromStorage());
  const [todoInput, setTodoInput] = useState("");

  const addTodo = () => {
    if (todoInput.trim() === "") return;

    const newTodos = [
      { id: Date.now(), text: todoInput, completed: false },
      ...todos,
    ];
    setTodos(newTodos);
    saveTodosToStorage(newTodos);
    setTodoInput("");
  };

  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    saveTodosToStorage(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveTodosToStorage(newTodos);
  };

  const onChangeInput = (e) => {
    console.log("SyntheticEvent", e);
    setTodoInput(e.target.value);
  };

  return (
    <div>
      <h1>TODO 리스트</h1>
      <input
        type="text"
        value={todoInput}
        onChange={onChangeInput}
        placeholder="할 일을 입력하세요."
      />
      <button onClick={addTodo}>추가</button>
      {todos.length === 0 ? (
        <p>할 일이 없습니다.</p>
      ) : (
        <ul>
          {todos.map(({ id, text, completed }) => (
            <li key={id}>
              <input
                type="checkbox"
                checked={completed}
                onClick={() => toggleTodo(id)}
              />
              {text}
              <button onClick={() => deleteTodo(id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
