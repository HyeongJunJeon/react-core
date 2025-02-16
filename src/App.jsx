import { useState } from "./hooks/useState";
import { getItem, setItem } from "./util/storage";
import { TODOS } from "./util/const";

const loadTodosFromStorage = () => {
  const savedTodos = getItem(TODOS);
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const saveTodosToStorage = (todos) => {
  setItem(TODOS, JSON.stringify(todos));
};

function App() {
  const [todos, setTodos] = useState(loadTodosFromStorage());
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodos = [{ text: input, completed: false }, ...todos];
    setTodos(newTodos);
    saveTodosToStorage(newTodos);
    setInput("");
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    saveTodosToStorage(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    saveTodosToStorage(newTodos);
  };

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <h1>TODO 리스트</h1>
      <input
        type="text"
        value={input}
        onChange={onChangeInput}
        placeholder="할 일을 입력하세요."
      />
      <button onClick={addTodo}>추가</button>

      <ul>
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={todo.completed}
                onClick={() => toggleTodo(index)}
              />
              {todo.text}
              <button onClick={() => deleteTodo(index)}>삭제</button>
            </li>
          ))
        ) : (
          <li>할 일이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
