import React, { Component } from 'react';
import './App.css';
import FormTodo from './components/formTodo.js'
import TodoList from './components/todoList.js'

let todo = (key, text, completed, isEditable) => ({key, text, completed, isEditable});

class App extends Component {  

  constructor(props) {
    super(props);
    this.state = { items: [], lastId: 0 }; 
    this.addTodo = this.addTodo.bind(this);      
    this.handleRemove = this.handleRemove.bind(this);  
  }   
  componentDidMount() {
    fetch('/todos/todos')
          .then(res => { 
            return res.json();
          })
          .then(todos => {            
            this.setState({ items: todos.data, })
            
          })
          .catch(function(err){
            console.error(err);
          });
  }
  
  addTodo(val){    
    let count = this.state.lastId + 1;
    let newItem = todo(this.state.lastId, val, false, false);
    fetch('/todos/todos', {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify({ newItem }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    })
    .then(res => {
        this.setState(...this.state, {lastId : count});     
        let newItems = [...this.state.items];
        newItems.push(todo(this.state.lastId, val, false, false)); 
        this.setState(...this.state, {items: newItems});
        return res.json
    })
    .catch(err => console.error);

    
    
  }
  
  handleRemove(key){
    const remainder = this.state.items.filter((todo) => {
        return (todo.key !== key);
      });
    this.setState({items: remainder});  
  }
  render() {
    return (  
      <div>    
        <FormTodo addTodo={this.addTodo}/>
        <TodoList todos={this.state.items} remove={this.handleRemove.bind(this)} />
      </div>
    );
  }
}

export default App;
