import React from "react";
import "./index.css";
const myStorage = window.localStorage;


class Header extends React.Component {y
  render() {
    return <h4 >Todo list</h4>;
  }
}

class ToDoInput extends React.Component {
  render() {
    return (
      <div class="add-items d-flex">
        <input id="toDoInput" type="text" class="form-control " placeholder="What do you need to do today?"/>
        <button class="add btn btn-primary font-weight-bold todo-list-add-btn" onClick={
          (e) => (
            //Al Click del bottone viene chiamata la funzione "addToDo" del componente "Main" passata come props alla quale viene
            //passato come parametro il contenuto del campo di testo; il campo di testo viene poi pulito
            this.props.addToDo(document.getElementById("toDoInput").value,
            document.getElementById('toDoInput').value = '')
            )
          }>Add</button>
      </div>
    );
  }
}

class ToDoList extends React.Component {
   //componente che gestisce la visualizzazione di tutti i To do
  checkToDo(index) {//aggiunge o rimuove la classe "strike" alla label dell'elemento to do associato all'indice passato come parametro
    let label = document.getElementById("label" + index)//recupero l'elemento label che contiene il To do selezionato
    let checkbox = document.getElementById("checkbox" + index)//recupero l'elemento label che contiene il To do selezionato
    if(label.classList.contains('strike')){
      label.classList.remove('strike')
      myStorage.removeItem(index.toString()+"checked")
      checkbox.classList.remove('checked')
    }
      
    else{
      label.classList.add('strike')
      checkbox.classList.add('checked')
      myStorage.setItem(index.toString()+"checked","1")
    }
    this.forceUpdate()
    //N.B: la classe strike è definita in index.css ed aggiunge lo stile:{text-decoration: line-through}
  }

  render() {
    var elementsList = []
    //recupero il valore di tutti i To do salvati nel web local storage e li salvo nell'array elementLIst
    for(var i = 0; i < parseInt(myStorage.getItem("nElements")); i++){
      if(myStorage.getItem(i.toString()) !== null){
        if(myStorage.getItem(i.toString()+"checked") === null)
          elementsList.push({id:i.toString(),toDo: myStorage.getItem(i.toString()),strike:'',checked:''})
        else
          elementsList.push({id:i.toString(),toDo: myStorage.getItem(i.toString()),strike:'strike',checked:'checked'})
      }
       
    }
    
    return (
      <div class="list-wrapper">
        <ul class="d-flex flex-column-reverse todo-list">
        {elementsList.map(e => (
          //con la funzione map viene applicato lo stesso metodo per ogni elemento dell'array
          //viene quindi generata una lista puntata dove ogni linea contiene un ToDo e due bottoni, uno per cancellare temporaneamente e l'altro per eliminare
          <li key={e.id}>
            <div class="form-check"> 
              <label class={"form-check-label " + e.strike} id={"label" + e.id}> <input id={"checkbox" + e.id} class="checkbox" checked={e.checked === 'checked'} type="checkbox" onClick={
                //l'elemento checkbox se cliccato invoca il metodi CheckToDo passando come parametro il proprio
                (event) => this.checkToDo(e.id)
                }/> {e.toDo} <i class="input-helper"></i></label> 
              </div> 
              <i class="remove mdi mdi-close-circle-outline" onClick={
                //l'icona, una volta premuta, invoca il metodo "removeToDo" del componente "Main" e passa come parametro l'id del proprio to do
                (event) => this.props.removeToDo(e.id)}></i>
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
    //lo stato viene usato solamente per forzare il render dell'componente "ToDoList"
    this.state = {
      refreshChild : 0
    };
  }
  
  //funzione che aggiunge un item al web local storage
  addToDo(param){
    if(param === "")
      return
    this.setState(
      //setto lo stato solo per forzare il render del componente ToDoList
      {
      refreshChild : 1
      }
    )
    if(myStorage.getItem("nElements") === null){//se non sono presenti to do
      myStorage.setItem("nElements", "0") //creo l'indice per i to do nel web storage
      myStorage.setItem(myStorage.getItem("nElements"),param) //aggiungo il messaggio del toDo
      myStorage.setItem("nElements", "1")//incremento l'indice
    }
    else{
      myStorage.setItem(myStorage.getItem("nElements"),param) //aggiungo il messaggio del toDo
      myStorage.setItem("nElements",(parseInt(myStorage.getItem("nElements")) + 1).toString())//incremento l'indice
    }
    }

    //funzione che rimuove il to do corrispondente all'indice passato come parametro
  removeToDo(index){
    //se non è presente nessun elemento con tale indice termina la funzione
    if(myStorage.getItem(index.toString()) === null){
      return
    }
    myStorage.removeItem(index.toString()) //rimuove l'elemento con indice 'index' dal web local storage
    
    this.setState({//forza il render del componente toDoList
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