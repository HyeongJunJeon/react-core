import { useState } from "./hooks/useState";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("안녕");

  return (
    <div>
      <h1>Counter: {count}</h1>

      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count - 1)}>감소</button>

      <h1>Text: {text}</h1>
      <button onClick={() => setText("Hello")}>Hello</button>
    </div>
  );
}

export default App;
