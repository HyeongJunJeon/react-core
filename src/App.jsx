import { unmountApp, useEffect } from "./hooks/useEffect";
import { useState } from "./hooks/useState";
import { TODOS } from "./util/const";
import { getItem, setItem } from "./util/storage";

const loadTodosFromStorage = () => {
  const savedTodos = getItem(TODOS);
  return savedTodos ? savedTodos : [];
};

const saveTodosToStorage = (todos) => {
  setItem(TODOS, todos);
};

const getTimeLeft = () => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);

  const diff = midnight - now;

  if (diff <= 0) return "00:00:00";

  const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

function App() {
  const [todos, setTodos] = useState(loadTodosFromStorage());
  const [todoInput, setTodoInput] = useState("");
  const [dogImageUrl, setDogImageUrl] = useState(
    "https://images.dog.ceo/breeds/maltese/n02085936_6077.jpg"
  );
  const [isFetching, setIsFetching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

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
    setTodoInput(e.target.value);
  };

  //useEffect 테스트
  useEffect(() => {
    const isInitialRender = getItem(TODOS).length === todos.length;

    const fetchDogImage = async () => {
      setIsFetching(true);
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        setDogImageUrl(data.message);
      } catch (error) {
        console.error("api 에러 발생");
      } finally {
        setIsFetching(false);
      }
    };

    if (!isInitialRender) {
      fetchDogImage();
    }
  }, [todos]);

  //useEffect 테스트
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timerId);
      console.log("cleanup");
    };
  }, []);

  return (
    <div>
      <h1>TODO 리스트</h1>
      <h2>오늘의 남은 시간: {timeLeft}</h2>

      <input
        type="text"
        value={todoInput}
        onChange={onChangeInput}
        placeholder="할 일을 입력하세요."
      />
      <button onClick={addTodo}>추가</button>
      <button onClick={unmountApp}>앱 종료</button>
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

      <div>
        <h2>todo-list가 바뀔때마다 이미지가 바뀜</h2>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <img src={dogImageUrl} alt="Dog" width={150} height={150} />
        )}
      </div>
    </div>
  );
}

export default App;
