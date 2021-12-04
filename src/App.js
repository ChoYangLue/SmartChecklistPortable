import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      todo: [
       { title: 'JavaScript覚える' } ,
       { title: 'jQuery覚える' } ,
       { title: 'ES2015覚える' } ,
       { title: 'React覚える' }
      ]
    };
    this.addTodo = this.addTodo.bind(this);
  }
  
  // 新規追加
  addTodo() {

    // 何も入力されていなかったらリターン
    if (!this.refs.newText.value) return;

    // 追加
    this.state.todo.push({
      title: this.refs.newText.value
    });
    // 保存
    this.setState({
      todo : this.state.todo
    });
    // 初期化
    this.refs.newText.value='';
  }
 
  // 削除機能
  deleteTodo(i) {
    // 削除
    this.state.todo.splice(i, 1);
    // 保存
    this.setState({
      todo : this.state.todo
    });
  }

  handleOnChange(e) {
    //setText(e.target.value);
    this.refs.newText.value = e.target.value;
  }
 
  render() {
    return (
      <div lassName="App">
        <header className="App-header">

        <h1>TODOアプリ</h1>
        <ul>
          {this.state.todo.map( (todo, i) => {
            return <li key={i}> <input type="button" value="☓"
                       onClick={() => this.deleteTodo(i)}/> {todo.title}</li>
          })}
        </ul>


        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.addTodo();
          }}>
          <input type="text" ref="newText" onChange={(e) => this.handleOnChange(e)} />
          <input type="submit" value="追加" onSubmit={this.addTodo} />
        </form>

        </header>


      </div>
    );
  }
}

export default App;