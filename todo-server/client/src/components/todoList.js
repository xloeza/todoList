import React from 'react';
import '../App.css';

const Todo = ({todo, remove}) => {
    let checkedClass = todo.completed === true ? "todo-item completed" : "todo-item";
    let todoHide = todo.isEditable === true? "" :"todo-hide";
    return (
        <li className={ checkedClass }>
            <input type="checkbox" id={"todo-item-" + todo.key}/>
            <form className="update-form clearfix"  autoComplete="off">
                <input type="text" id={"input-text" + todo.key}  className={todoHide} />
            </form>
            <label className={todoHide}>
                {todo.text}
            </label>
            <button onClick={() => {remove(todo.key)}}>X</button> 
      </li>   
    );
}

const TodoList = ({todos, remove}) => {
    const todoNode = todos.map((todo) => {
      return (<Todo todo={todo} key={todo.key} remove={remove}/>)
    });
   
    return(
        <div className="todo-content">
            <ul className="todo-list" id="todo-list1">
                {todoNode}
            </ul>
        </div>
    );
  }

// const Todo = ({todo, remove}) => {   
//     return (<a href="#" className="list-group-item" onClick={() => {remove(todo.key)}}>{todo.text}</a>);
//   }
  
//   const TodoList = ({todos, remove}) => {
  
//     const todoNode = todos.map((todo) => {
//       return (<Todo todo={todo} key={todo.key} remove={remove}/>)
//     });
//     return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
//   }
  
export default TodoList;