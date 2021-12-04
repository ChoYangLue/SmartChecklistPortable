import './App.css';
import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.statusList = ["TODO", "PROG", "DONE", "SKIP"];

    this.state = {
      todo: [
       { title: 'JavaScript覚える', status: "TODO" } ,
       { title: 'jQuery覚える', status: "TODO" } ,
       { title: 'ES2015覚える', status: "TODO" } ,
       { title: 'React覚える', status: "TODO" }
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
      title: this.refs.newText.value,
      status: this.statusList[0]
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

  changeTodoStatus(i) {
    this.state.todo[i].status = this.getNextStatus(this.state.todo[i].status);
    
    console.log("change status:"+this.state.todo[i].status);

    this.setState({
      todo : this.state.todo
    });
  }

  getNextStatus(preStatus) {
    var preIndex = this.statusList.indexOf(preStatus);

    if (preIndex + 1 >= this.statusList.length) {
      return this.statusList[0];
    }

    return this.statusList[preIndex + 1];
  }

  handleOnChange(e) {
    this.refs.newText.value = e.target.value;
  }
 
  render() {
    return (
      <div lassName="App">
        <header className="App-header">

        <h1>SmartChecklistPortable</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.addTodo();
          }}>
          <input type="text" ref="newText" onChange={(e) => this.handleOnChange(e)} />
          <input type="submit" value="追加" onSubmit={this.addTodo} />
        </form>

        <ul>
          {this.state.todo.map( (todo, i) => {
            return <li key={i}>
            <input type="button" value={todo.status} onClick={() => this.changeTodoStatus(i)}/>
            {todo.title}
            <input type="button" value="☓" onClick={() => this.deleteTodo(i)}/> 
            </li>
          })}
        </ul>

        </header>

      </div>
    );
  }
}

export default App;