import './App.css';
import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.statusList = ["TODO", "PROG", "DONE", "SKIP"];

    this.state = {
      todo: [
       { title: 'JavaScript覚える', status: "TODO", isEdit: false } ,
       { title: 'jQuery覚える', status: "TODO", isEdit: false } ,
       { title: 'ES2015覚える', status: "TODO", isEdit: false } ,
       { title: 'React覚える', status: "TODO", isEdit: false }
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

  changeTodoTitle(i) {
    console.log("edit");

    if (this.state.todo[i].isEdit) this.state.todo[i].isEdit = false;
    else this.state.todo[i].isEdit = true;

    this.refs.addText.value = this.state.todo[i].title;
    this.setState({
      todo : this.state.todo
    });
  }

  onBlurTitleEdit(i) {
    console.log("edit end");
    if (this.state.todo[i].isEdit) this.state.todo[i].isEdit = false;
    else this.state.todo[i].isEdit = true;

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

  handleOnChangeEdit(i, e) {
    this.state.todo[i].title = e.target.value;

    this.setState({
      todo : this.state.todo
    });
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
            return <li key={i} >
            <input type="button" value={todo.status} onClick={() => this.changeTodoStatus(i)}/>
            <span onClick={() => this.changeTodoTitle(i)} hidden={todo.isEdit}>{todo.title}</span>
            <input type="text" ref="addText" onChange={(e) => this.handleOnChangeEdit(i, e)} value={todo.title} hidden={!todo.isEdit} onBlur={() => this.onBlurTitleEdit(i)} autoFocus={todo.isEdit}/>
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