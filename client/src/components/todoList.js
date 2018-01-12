import React from 'react';
import '../App.css';

const Todo = ({todo, remove}) => {
    let checkedClass = todo.completed === true ? "todo-item completed" : "todo-item";
    //let todoHide = todo.isEditable === true? "" :"todo-hide";
    return (
        <li className={ checkedClass }>            
            <label >
                {todo.text}
            </label>
            <button onClick={() => {remove(todo._id)}}>X</button> 
        </li>   
    );
}

const TodoList = ({todos, remove}) => {
    const todoNode = todos.map((todo) => {
      return (<Todo todo={todo} _id={todo._id} remove={remove}/>)
    });
   
    return(
        <div className="todo-content">
            <ul className="todo-list" id="todo-list1">
                {todoNode}
            </ul>
        </div>
    );
  }
  
export default TodoList;