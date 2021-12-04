import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [text, setText] = useState('');

  //const [todos, setTodos] = useState<Todo>([]);

  const todos = ["リンゴ", "パイナップル", "ペン"];

  // todos ステートを更新する関数
  const handleOnSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return;

    // 新しい Todo を作成
    const newTodo = {
      value: text,
    };

    //setTodos([newTodo, ...todos]);
    todos.push(text);
    // フォームへの入力をクリアする
    setText('');

    console.log(todos);
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
          }}>
          <input type="text" value={text} onChange={(e) => handleOnChange(e)} />
          <input type="submit" value="追加" onSubmit={handleOnSubmit} />
      </form>

      <ul>
        {todos.map((todo, i) => <li key={i}>{todo}</li>)}
      </ul>

      </header>


    </div>
  );
}

export default App;
