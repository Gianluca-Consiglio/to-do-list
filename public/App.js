import React from "react";

import "./App.css";

class Header extends React.Component {
  render() {
    return <h1 id="titolo">To do list</h1>;
  }
}

class ToDoInput extends React.Component {
  render() {
    return (
      <div>
        <input id="toDoInput" type="text"></input>
        <button id="saveTodo" onClick={(e) => this.props.addToDo(document.getElementById("toDoInput").value)}>
          Save
        </button>
      </div>
    );
  }
}

class ToDoList extends React.Component {
  render() {
    const { list } = this.props;
    const elementsListJSX = list.map(e => <li key={e.id}>{e.toDo}</li>);
    return <ul>{elementsListJSX}</ul>;
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      elementsList: [
        { id: 0, toDo: "Wake up" },
        { id: 1, toDo: "Have breakfast" },
        { id: 2, toDo: "Brush your teeth" }
      ],
      nElements: 3
    };
  }

  addToDo(param){
    console.log(param)
    if(param === "")
      return
    this.setState({
      elementsList: [...this.state.elementsList,{id:this.state.nElements+1,toDo: param}],
      nElements: this.state.nElements + 1
    })
    }

  render() {
    return(
      <div>
        <ToDoInput addToDo={event => this.addToDo(event)}/>
        <ToDoList list={this.state.elementsList} />
      </div>
      
    )
  }
}

function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

export default App;
