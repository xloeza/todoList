import React, { Component } from 'react';
import './App.css';
import FormTodo from './components/formTodo.js'
import TodoList from './components/todoList.js'

let todo = (_id, text, completed, isEditable) => ({_id, text, completed, isEditable});

class App extends Component {  

  constructor(props) {
    super(props);
    this.state = { items: []}; 
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
      return res.json();
    })
    .then(res => {            
        let newItems = [...this.state.items];
        newItems.push(todo(res._id, val, false, false)); 
        this.setState(...this.state, {items: newItems});
        return res.json
    })
    .catch(err => console.error);

    
    
  }
  
  handleRemove(_id){
    fetch('/todos/todos/'+_id, {
      method: 'DELETE'      
    })
    .then(res => { 
      return res.json();
    })
    .then(res => { 
      const remainder = this.state.items.filter((todo) => {
        return (todo._id !== _id);
      });
    this.setState({items: remainder});
    })
    .catch(err => console.error);
  
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
