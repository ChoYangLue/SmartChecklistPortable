import './App.css';
import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.statusList = ["TODO", "PROG", "DONE", "SKIP"];
    this.statusStyleDictionary = { TODO:"white", PROG:"red", DONE:"green", SKIP:"gray" };
    this.colorProfile = { baseText:"white", hideText:"gray" };

    this.state = {
      // todo: [{ title: 'JavaScript覚える', status: "TODO", isEdit: false, inputRef: React.createRef(), isChecked: false, indent: 0 }]
      todo: JSON.parse(localStorage.getItem("todoList")) || [],
    };
    this.state.todo.map( (todo, i) => {
      todo.inputRef = React.createRef();
    });
    this.addTodo = this.addTodo.bind(this);
    this.addTodoInputRef = React.createRef();
  }

  // 画面Update
  componentDidUpdate() {
    this.state.todo.map( (todo, i) => {
      if (todo.isEdit) {
        // 編集状態ならフォーカスを合わせる
        todo.inputRef.current.focus();
        return;
      }
    });
  }

  // LocalStorageへのSave
  saveTodoForLocalStorage() {
    console.log("save to LocalStorage");
    //console.log(JSON.stringify(this.state.todo, this.getCircularReplacer()));
    localStorage.setItem("todoList", JSON.stringify(this.state.todo, this.getCircularReplacer()));
  }

  // listの中身がObjectだったらNullに変換する
 getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  // 新規追加
  addTodo() {
    console.log("add todo");

    // 何も入力されていなかったらリターン
    if (!this.addTodoInputRef.current.value) return;

    // 追加
    this.state.todo.push({
      title: this.addTodoInputRef.current.value,
      status: this.statusList[0],
      inputRef: React.createRef()
    });

    this.setState({
      todo : this.state.todo
    });

    this.saveTodoForLocalStorage();
    
    this.addTodoInputRef.current.value='';
  }
 
  // 削除機能
  deleteTodo(i) {
    console.log("delete todo");
    
    this.state.todo.splice(i, 1);

    this.setState({
      todo : this.state.todo
    });

    this.saveTodoForLocalStorage();
  }

  // 編集
  changeTodoTitle(i) {
    console.log("edit start");
    this.state.todo[i].isEdit = true;

    this.state.todo[i].inputRef.current.value = this.state.todo[i].title;
    this.state.todo[i].inputRef.current.focus();
    this.setState({
      todo : this.state.todo
    });
    
    //this.saveTodoForLocalStorage();
  }

  // フォーカスが外れたため編集終了
  onBlurTitleEdit(i) {
    console.log("edit end by blur");
    this.state.todo[i].isEdit = false;

    this.setState({
      todo : this.state.todo
    });
    this.saveTodoForLocalStorage();
  }

  // キー入力
  onKeyDownTitleEdit(i, e) {
    console.log("edit end by enter");

    if (e.key == 'Enter') {
      // Enterキーが押されたため編集終了
      e.preventDefault();
      
      this.state.todo[i].isEdit = false;

      this.setState({
        todo : this.state.todo
      });
    } else if (e.key === 'Tab' && e.keyCode !== 229) {
      // タイプしたキーがTabキーの時 かつ 日本語入力未確定状態でない時
      e.preventDefault();

      this.state.todo[i].indent = this.changeTodoIndent(i);

      console.log(this.state.todo[i].indent);
      this.setState({
        todo : this.state.todo
      });
    }

    this.saveTodoForLocalStorage();
  }

  changeTodoIndent(i) {
    if (isNaN(this.state.todo[i].indent)) return 0;
    if (i == 0) return 0;

    if (isNaN(this.state.todo[i-1].indent)) return 1;
    return this.state.todo[i-1].indent + 1;
  }

  // ステータス更新
  changeTodoStatus(i) {
    this.state.todo[i].status = this.getNextStatus(this.state.todo[i].status);
    
    console.log("change status:"+this.state.todo[i].status);

    this.setState({
      todo : this.state.todo
    });
    this.saveTodoForLocalStorage();
  }

  getNextStatus(preStatus) {
    var preIndex = this.statusList.indexOf(preStatus);

    if (preIndex + 1 >= this.statusList.length) {
      return this.statusList[0];
    }

    return this.statusList[preIndex + 1];
  }

  handleOnChange(e) {
    this.addTodoInputRef.current.value = e.target.value;
  }

  handleOnChangeEdit(i, e) {
    this.state.todo[i].title = e.target.value;

    this.setState({
      todo : this.state.todo
    });
  }

  handleOnChangeCheckbox(i, e) {
    if (this.state.todo[i].isChecked) {
      this.state.todo[i].isChecked = false;
      this.state.todo[i].status = "TODO";
    }
    else {
      this.state.todo[i].isChecked = true;
      this.state.todo[i].status = "DONE";
    }

    this.setState({
      todo : this.state.todo
    });
    this.saveTodoForLocalStorage();
  }

  moveListForward(index) {
    if (index-1 < 0) return;

    // 一つ前と入れ替え
    this.state.todo.splice(index-1, 2, this.state.todo[index], this.state.todo[index-1]);

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
          <input type="text" ref={this.addTodoInputRef} onChange={(e) => this.handleOnChange(e)} />
          <input type="submit" value="追加" onSubmit={this.addTodo} />
        </form>

        <ul className="ul-style">
          {this.state.todo.map( (todo, i) => {
            return <li key={i} style={{ justifyContent: 'center', flexDirection: 'row', paddingLeft: todo.indent*20 }}>
            <input type="button" value="↑" onClick={() => this.moveListForward(i)} className="upvote-button-style"/> 
            <input type="checkbox" checked={todo.isChecked} onChange={(e) => this.handleOnChangeCheckbox(i, e)} />
            <input type="button" value={todo.status} onClick={() => this.changeTodoStatus(i)} className="status-button-style" style={{color: this.statusStyleDictionary[todo.status], border: '2px solid '+this.statusStyleDictionary[todo.status] }}/>
            <span onClick={() => this.changeTodoTitle(i)} style={{ textDecorationLine: todo.isChecked?'line-through':'', color: todo.isChecked?this.colorProfile.hideText:this.colorProfile.baseText }} hidden={todo.isEdit}>{todo.title}</span>
            <input type="text" ref={todo.inputRef} onChange={(e) => this.handleOnChangeEdit(i, e)} value={todo.title} hidden={!todo.isEdit} onBlur={() => this.onBlurTitleEdit(i)} onKeyDown={(e) => this.onKeyDownTitleEdit(i, e)}/>
            <input type="button" value="☓" onClick={() => this.deleteTodo(i)} className="delete-button-style"/> 
            </li>
          })}
        </ul>

        </header>

      </div>
    );
  }
}

export default App;