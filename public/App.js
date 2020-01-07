import React from "react";

import "./App.css";
const myStorage = window.localStorage;

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
    var elementsList = []
    for(var i = 0; i < parseInt(myStorage.getItem("nElements")); i++){
      elementsList.push({id:i.toString(),toDo: myStorage.getItem(i.toString())})
    }  
    return <ul>{elementsList.map(e => <li key={e.id}>{e.toDo}</li>)}</ul>;
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
      nElements: this.state.nElements + 1,
      elementsList: [...this.state.elementsList,{id:this.state.nElements,toDo: param}]
    })
    if(myStorage.getItem("nElements") === null){
      myStorage.setItem("nElements", "0")
      myStorage.setItem(myStorage.getItem("nElements"),param)
    }
    else{
      myStorage.setItem("nElements",(parseInt(myStorage.getItem("nElements")) + 1).toString())
      myStorage.setItem(myStorage.getItem("nElements"),param)
    }
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