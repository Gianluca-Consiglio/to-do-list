import React from "react";
import "./index.css";
const myStorage = window.localStorage;

class Header extends React.Component {
  render() {
    return <h4 class="card-title">Awesome Todo list</h4>;
  }
}

class ToDoInput extends React.Component {
  render() {
    return (
      <div class="add-items d-flex">
        <input id="toDoInput" type="text" class="form-control " placeholder="What do you need to do today?"/> <button class="add btn btn-primary font-weight-bold todo-list-add-btn" onClick={(e) => (this.props.addToDo(document.getElementById("toDoInput").value, document.getElementById('toDoInput').value = ''))}>Add</button>
      </div>
    );
  }
}

class ToDoList extends React.Component {
  checkToDo(index) {
    let label = document.getElementById("label" + index)
    if(label.classList.contains('strike'))
      label.classList.remove('strike')
    else
      label.classList.add('strike')
  }

  render() {
    var elementsList = []
    for(var i = 0; i < parseInt(myStorage.getItem("nElements")); i++){
      if(myStorage.getItem(i.toString()) !== null)
        elementsList.push({id:i.toString(),toDo: myStorage.getItem(i.toString())})
    }
    
    return (
      <div class="list-wrapper">
        <ul class="d-flex flex-column-reverse todo-list">
        {elementsList.map(e => (
          <li key={e.id}>
            <div class="form-check"> <label class="form-check-label" id={"label" + e.id}> <input class="checkbox" type="checkbox" onClick={(event) => this.checkToDo(e.id)}/> {e.toDo} <i class="input-helper"></i></label> </div> <i class="remove mdi mdi-close-circle-outline" onClick={(event) => this.props.removeToDo(e.id)}></i>
          </li>
        ))}
      </ul>
      </div>
      
    )
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      refreshChild : 0
    };
  }
  

  addToDo(param){
    console.log(param)
    if(param === "")
      return
    this.setState({
      refreshChild : 1
    })
    if(myStorage.getItem("nElements") === null){
      myStorage.setItem("nElements", "0")
      myStorage.setItem(myStorage.getItem("nElements"),param)
      myStorage.setItem("nElements", "1")
    }
    else{
      myStorage.setItem(myStorage.getItem("nElements"),param)
      myStorage.setItem("nElements",(parseInt(myStorage.getItem("nElements")) + 1).toString())
    }
    }

  removeToDo(index){
    console.log(index)
    if(myStorage.getItem(index.toString()) === null){
      console.log("NULLLLLL")
      return
    }
    myStorage.removeItem(index.toString())
    myStorage.setItem("nElements",myStorage.getItem("nElements"))
    this.setState({
      refreshChild : 1
    })
  }

  render() {
    return(
      <div>
        <ToDoInput addToDo={event => this.addToDo(event)}/>
        <ToDoList list={this.state.refreshChild} removeToDo={event => this.removeToDo(event)}/>
      </div>
    )
  }
}

function App() {
  return (
    <div>
      <div class="page-content page-container" id="page-content">
      <div class="padding">
          <div class="row container d-flex justify-content-center">
              <div class="col-lg-12">
                  <div class="card px-3">
                      <div class="card-body">
                            <Header />
                            <Main />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    
  );
}

export default App;